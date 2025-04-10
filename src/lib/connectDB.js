import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log("test1db");
    if (!MONGO_URI) {
      throw new Error("MongoDB URI is missing in .env.local");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {console.log("test1----catch");
    console.error("MongoDB Connection Error:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
