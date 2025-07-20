import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const {
    auctionId,
    auctionSku,
    auctionName,
    userName,
    userEmail,
    userMobile,
    bidAmount,
  } = req.body;

  if (!auctionId || !userMobile || !bidAmount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Insert bid
    await db.execute(
      `INSERT INTO auctionstore (auctionId, auctionSku, auctionName, userName, userEmail, userMobile, bidAmount)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [auctionId, auctionSku, auctionName, userName, userEmail, userMobile, bidAmount]
    );

    // Update current price and count
    await db.execute(
      `UPDATE auctions
       SET currentBidPrice = ?, bidCount = bidCount + 1
       WHERE auctionId = ?`,
      [bidAmount, auctionId]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Bid Error:", err);
    res.status(500).json({ error: "Failed to store bid" });
  }
}
