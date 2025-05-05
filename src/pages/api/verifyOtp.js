import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { encryptData } from '../../utils/crypto';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { phone, otp ,sessionId} = req.body;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const response = await fetch(
    `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
  );
  const data = await response.json();
  if (data.Details === "OTP Matched") {
    const [rows] = await db.execute("SELECT * FROM Users WHERE mobile = ?", [phone]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid OTP" });
    const user = rows[0];
    const cuser = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    };
    const encryptedUser = encryptData(cuser);
    await db.execute("UPDATE Users SET otp = NULL WHERE mobile = ?", [phone]);
    const token = jwt.sign({ id: user.id, phone: user.mobile }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: "OTP verified" ,token, encryptedUser,cuser});
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
    //res.status(200).json({ message: "OTP verified", token });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "Server error" });
  }
}