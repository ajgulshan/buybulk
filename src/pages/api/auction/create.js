import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    auctionId,
    auctionSku,
    auctionName,
    description,
    brand,
    category,
    initialBid,
    incrementBid,
    live,
    duration,
    bidStartTime,
    turnover,
  } = req.body;

  if (
    !auctionId ||
    !auctionSku ||
    !auctionName ||
    !description ||
    !brand ||
    !category ||
    !initialBid ||
    !incrementBid ||
    !live ||
    !duration ||
    !bidStartTime ||
    !turnover
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const query = `
  INSERT INTO auctions (
    auctionId, auctionSku, auctionName, description,
    brand, category, initialBid, incrementBid,
    live, duration, bidStartTime, turnover
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;


    const values = [
      auctionId,
      auctionSku,
      auctionName,
      description,
      brand,
      category,
      initialBid,
      incrementBid,
      live,
      duration,
      bidStartTime,
      turnover,
    ];

    await db.execute(query, values);

    // ✅ Log matched users by turnover
    const [rows] = await db.execute(
      "SELECT email FROM Users WHERE turnover = ?",
      [turnover]
    );

    if (rows.length > 0) {
      console.log("Matched emails:");
      rows.forEach((row) => console.log(row.email));
    } else {
      console.log("Matched emails: null");
    }

    res.status(200).json({ message: "Auction created successfully" });
  } catch (error) {
    console.error("Auction Insert Error:", error);
    res.status(500).json({ error: "Failed to create auction" });
  }
}
