// pages/api/contact.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { name, email, phone, message, consent } = req.body;

  if (!name || !email || !message || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    await db.execute(
      "INSERT INTO contact (name, email, phone, message, consent) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, message, consent ? 1 : 0]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error.message);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
}
