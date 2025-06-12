// pages/api/inquiry.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    product_id,
    product_name,
    sku,
    quantity,
    offer_price_per_piece,
    customer_name,
    contact_number,
  } = req.body;

  if (!product_id || !quantity || !offer_price_per_piece || !customer_name || !contact_number) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await db.execute(
      `INSERT INTO buybulkinquiry 
        (product_id, product_name, sku, quantity, offer_price_per_piece, customer_name, contact_number, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        product_id,
        product_name,
        sku,
        quantity,
        offer_price_per_piece,
        customer_name,
        contact_number,
      ]
    );

    await db.end();

    res.status(200).json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Inquiry Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
