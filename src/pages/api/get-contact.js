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
      `SELECT * FROM contact ORDER BY created_at DESC`
    );

    res.status(200).json({ contacts: rows });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
