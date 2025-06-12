import mysql from "mysql2/promise";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const uploadFolder = path.join(process.cwd(), "public", "uploads", "sku");
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }

  const form = new IncomingForm({
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadFolder,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ message: "Form parsing error", error: err.message });
    }

    const {
      name,
      pricePerPiece,
      brand,
      moq,
      quantity,
      verified: rawVerified,
      city,
      address,
      state,
      category,
      description,
      catalog,
      bbn,
    } = fields;
    
    const verified =
      rawVerified && typeof rawVerified === "string"
        ? rawVerified.toLowerCase() === "yes"
          ? 1
          : 0
        : 0;
    

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [rows] = await db.query("SELECT COUNT(*) AS count FROM products");
      const skuNumber = rows[0].count + 1;
      const sku = `bbsku${skuNumber}`;

      const parsedCategory = Array.isArray(category) ? category : [category];
      const catalogValue = Array.isArray(catalog) ? catalog[0] : catalog;
      const catalogType = catalogValue === "BuyBulk Self" ? 1 : 0;
      const handleImage = async (file, suffix) => {
        if (!file || !file.filepath) return "";
        const filename = `${sku}${suffix}.jpg`;
        const destPath = path.join(uploadFolder, filename);
      
        try {
          await sharp(file.filepath)
            .jpeg({ quality: 80 })
            .toFile(destPath);
      
          fs.unlinkSync(file.filepath);
          return filename;
        } catch (err) {
          console.error(`Error converting/saving image with suffix ${suffix}:`, err);
          return "";
        }
      };
      

      // 🧠 Await image processing
      const mainImage = await handleImage(files.image?.[0], "imgd");
      const optionalImg1 = await handleImage(files.image1?.[0], "imgda");
      const optionalImg2 = await handleImage(files.image2?.[0], "imgdb");


      // 🧠 Parse `bbn` correctly (handle stringified JSON safely)
      let parsedBBN = {};
      try {
        parsedBBN = Array.isArray(bbn)
          ? JSON.parse(bbn[0])
          : JSON.parse(bbn);
      } catch (e) {
        console.warn("Could not parse BBN:", bbn);
      }

      await db.query(
        `INSERT INTO products 
         (sku, name, price_per_piece, brand, moq, quantity, verified, city, address, state, category, description, catalog_type, image_main, image1, image2, bbn) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sku,
          name,
          pricePerPiece,
          brand,
          moq,
          quantity,
          verified,
          city,
          address,
          state,
          parsedCategory.join(","),
          description,
          catalogType,
          mainImage || "",
          optionalImg1 || "",
          optionalImg2 || "",
          JSON.stringify(parsedBBN),
        ]
      );

      return res.status(200).json({ message: "Product added successfully!" });
    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
        stack: error.stack,
      });
    }
  });
}
