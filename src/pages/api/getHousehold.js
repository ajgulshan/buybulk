// pages/api/getHousehold.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.execute(
      "SELECT * FROM products WHERE catalog_type = 1 ORDER BY id DESC"
    );

    console.log("📦 All catalog products:", rows); // <-- Log all fields to console

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
}
