// pages/api/sendOtp.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { phone } = req.body;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [existingUser] = await db.execute(
      "SELECT * FROM Users WHERE mobile = ?",[phone]
    );
    if (!existingUser.length) {
      //throw new Error("Mobile number incorrect or not Registered, Kindly click on Sign Up" );
      res.status(409).json({ error: "Mobile number not Registered Kindly click on Sign Up" });
      return;
    }
    const response = await fetch(
      `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
    );
    const data = await response.json();

    console.log("2Factor response:", data);

    if (data.Status !== "Success") {
      res.status(405).json({ error: "Unable to send otp this Number try after some time" });
      return;
    }

    res.status(200).json({ message: "OTP sent successfully", sessionId: data.Details });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
