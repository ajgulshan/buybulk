// /pages/api/auction/next-id.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.execute("SELECT COUNT(*) as count FROM auctions");
  const nextId = `bbauction${rows[0].count + 1}`;
  res.status(200).json({ auctionId: nextId });
}
