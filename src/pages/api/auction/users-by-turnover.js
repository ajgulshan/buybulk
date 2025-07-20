import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { turnover } = req.body;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.execute("SELECT email FROM Users WHERE turnover = ?", [turnover]);

    if (rows.length === 0) {
      return res.status(200).json({ emails: null });
    }

    const emails = rows.map((u) => u.email);
    res.status(200).json({ emails });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
}
