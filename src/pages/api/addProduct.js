import formidable from "formidable";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), "public/uploads"),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Error parsing form data" });
    }

    const name = fields.name?.[0] ?? null;
    const sku = fields.sku?.[0] ?? null;
    const brand = fields.brand?.[0] ?? null;
    const mrp = fields.mrp?.[0] ?? null;
    const offerprice = fields.offerPrice?.[0] ?? null;
    const quantity = fields.quantity?.[0] ?? null;
    const verified = fields.verified?.[0] ?? null;
    const description = fields.description?.[0] ?? null;
    const image = files.image ? files.image.newFilename : null;
    

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [existing] = await db.execute("SELECT * FROM product WHERE sku = ?", [sku]);

      if (existing.length > 0) {
        return res.status(409).json({ error: "SKU already exists, upload product with a new SKU" });
      }

      const safe = (value) => (typeof value === "undefined" ? null : value);

      await db.execute(
        `INSERT INTO product (name, sku, brand, mrp, quantity, offerprice, verified, description, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          safe(name),
          safe(sku),
          safe(brand),
          safe(mrp),
          safe(quantity),
          safe(offerprice),
          safe(verified),
          safe(description),
          safe(image),
        ]
      );


      return res.status(200).json({ message: "Product added successfully" });
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
  });
}
