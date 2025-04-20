import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, otp } = req.body;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
console.log(phone);
console.log(otp);
    const [rows] = await db.execute("SELECT * FROM Users WHERE mobile = ?", [phone]);

    if (rows.length === 0) return res.status(401).json({ message: "Invalid OTP" });

    const user = rows[0];
    const token = jwt.sign({ id: user.id, phone: user.mobile }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await db.execute("UPDATE Users SET otp = NULL WHERE mobile = ?", [phone]);
console.log(token);
    res.status(200).json({ message: "OTP verified", token });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
