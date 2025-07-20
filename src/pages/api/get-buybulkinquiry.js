// /pages/api/get-buybulkinquiry.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.execute(
      `SELECT id, product_id, product_name, sku, quantity, offer_price_per_piece, customer_name, contact_number, created_at
       FROM buybulkinquiry
       ORDER BY created_at DESC`
    );

    res.status(200).json({ inquiries: rows });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch inquiries." });
  }
}
