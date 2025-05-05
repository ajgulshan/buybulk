import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, gender, email, mobile, gst, customerType, address, pincode, city } = req.body;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [existingUser] = await db.execute(
      "SELECT * FROM Users WHERE mobile = ? OR email = ?",
      [mobile, email]
    );
    
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Mobile number or email already exists, kindly login or register with new number" });
    }

    await db.execute(
      "INSERT INTO Users (name, gender, email, mobile, gst, customerType, address, pincode, city, customerGroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, gender, email, mobile, gst, customerType, address, pincode, city, "A"]
    );

    res.status(200).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
