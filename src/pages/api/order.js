// pages/api/order.js
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
    price_per_piece,
    total_price,
    user,
  } = req.body;

  if (!product_id || !quantity || !price_per_piece || !total_price || !user) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 1. Insert order
    await db.execute(
      `INSERT INTO buybulkorder 
        (product_id, product_name, sku, quantity, price_per_piece, total_price, user_token, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        product_id,
        product_name,
        sku,
        quantity,
        price_per_piece,
        total_price,
        user,
      ]
    );

    // 2. Update product quantity
    await db.execute(
      `UPDATE products SET quantity = quantity - ? WHERE id = ?`,
      [quantity, product_id]
    );

    await db.end();

    res.status(200).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
