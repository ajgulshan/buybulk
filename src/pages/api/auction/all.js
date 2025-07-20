// pages/api/auction/all.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.execute("SELECT * FROM auctions ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Fetch Auctions Error:", error);
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
}
