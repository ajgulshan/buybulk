import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const { search = "" } = req.query;

    const query = `
      SELECT id, name, email, mobile, gst, customerType, customerGroup, address, pincode, city, preferableCategory, companyName, turnover
      FROM Users
      WHERE name LIKE ?
      ORDER BY name ASC
    `;

    const [users] = await db.execute(query, [`%${search}%`]);

    res.status(200).json({ users });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
