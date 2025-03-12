import mongoose from "mongoose";

const connectDB = async () => {
    try {
      // Connect to MongoDB without deprecated options
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully");
    } catch (error) {
      console.error("MongoDB Connection Failed:", error);
      process.exit(1); // Exit the process if MongoDB connection fails
    }
  };

export default connectDB;