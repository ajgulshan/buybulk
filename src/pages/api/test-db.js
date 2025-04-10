import connectDB from "../../utils/db";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ message: "MongoDB is connected!" });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
}
