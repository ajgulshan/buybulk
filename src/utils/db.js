import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jhaofficial9:XM3kcbDdPOC5kwiL@cluster0.xr59b.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"; // Default to local MongoDB `users` database

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
