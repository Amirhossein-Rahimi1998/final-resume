import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("Missing MongoDB URL");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB connection already established");
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    isConnected = false;
    console.log("MongoDB connection error:", error);
  }
};