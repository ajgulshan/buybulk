// pages/api/houseorder.js

import mysql from "mysql2/promise";
import nodemailer from 'nodemailer';


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const {
    product_id,
    product_name,
    sku,
    quantity,
    price_per_piece,
    total_price,
    user,
    seller_name,
    seller_contact_number,
  } = req.body;
    const parsedUser = JSON.parse(user);
    const to = parsedUser.email;
    const name = parsedUser.name;
    const subject = 'Your Order Confirmation';
    //const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,      // your email address
        pass: process.env.EMAIL_PASS,      // app password (not your Gmail password)
      },
    });
    const mailOptions = {
      from: `"BuyBulk" <${process.env.EMAIL_USER}>`,
      to,                  // customer email
      subject,             // email subject
     // text,                // plain text
      html: `<h2>Hi ${name},</h2><p>Your order has been received!</p>`
    };

    await transporter.sendMail(mailOptions);

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await db.execute(
      `INSERT INTO buybulkhouseorder
        (product_id, product_name, sku, quantity, price_per_piece, total_price, user_token, seller_name, seller_contact_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product_id,
        product_name,
        sku,
        quantity,
        price_per_piece,
        total_price,
        user,
        seller_name,
        seller_contact_number,
      ]
    );

    await db.end();

    return res.status(200).json({ message: "Order placed successfully", id: result.insertId });
  } catch (error) {
    console.error("Order insert failed:", error);
    return res.status(500).json({ error: "Failed to store order" });
  }
}