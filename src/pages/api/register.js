import mysql from "mysql2/promise";

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method !== "POST") return res.status(405).end();

  console.log("test1reg55");
  const { name, gender,email,mobile,gst,customerType,address,pincode,city } = req.body;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await db.execute("INSERT INTO Users (name, gender,email,mobile,gst,customerType,address,pincode,city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, gender,email,mobile,gst,customerType,address,pincode,city]);

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}