import connectDB from "../../lib/connectDB";
import User from "../../models/User"; // Ensure you have a User model
console.log("test1reg55");
export default async function handler(req, res) {
  await connectDB(); // Ensure MongoDB is connected before processing
  console.log("test1reg");
  if (req.method === "POST") {
    console.log("test1");
    try {
      const { name, gender, state, city, mobile, email, password } = req.body;
      console.log("test2");

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Create new user
      const newUser = new User({ name, gender, state, city, mobile, email, password });
      await newUser.save();
      console.log("test3");

      return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.log("test1catch");
      console.error("Error registering user:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  console.log("testlast");
  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
