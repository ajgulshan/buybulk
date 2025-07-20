import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { auctionId } = req.query;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.execute("SELECT * FROM auctions WHERE auctionId = ?", [auctionId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Auction not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Auction Detail Error:", err);
    res.status(500).json({ error: "Failed to fetch auction" });
  }
}
