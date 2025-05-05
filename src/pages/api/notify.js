import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const {
      name,
      sku,
      brand,
      mrp,
      quantity,
      offerprice,
      verified,
      description,
      image,
      userKey,
      userNumber,
      userEmail,
    } = req.body;

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await db.execute(
      `INSERT INTO notify (name, sku, brand, mrp, quantity, offerprice, verified, description, image, userKey, userNumber, userEmail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name || "N/A",
        sku || "N/A",
        brand || "N/A",
        mrp || 0,
        quantity || 0,
        offerprice || 0,
        verified || "no",
        description || "Product coming soon",
        image || "placeholder.jpg",
        userKey || "demo",
        userNumber || "9191919191",
        userEmail || "test@email",
      ]
    );

    res.status(200).json({ message: "Notify request added, We will Reach to you. Kindly check your email" });
  } catch (error) {
    console.error("Notify DB error:", error);
    res.status(500).json({ error: "Database error while saving notify request" });
  }
}
