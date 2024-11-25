import mongoose from "mongoose";
import env from "../utils/validateEnv.js";

const connection = {};

export const connectToDb = async () => {
  if (connection.isConnected) {
    console.log("MongoDb is already connected");
    return;
  }

  try {
    connection.isConnected = true;
    const db = await mongoose.connect(env.MONGO_URI, {
      dbName: "BookAPI",
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
