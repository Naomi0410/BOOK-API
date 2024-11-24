import mongoose from "mongoose";
import env from "../utils/validateEnv.js";

const connection = {};

export const connectToDb = async () => {
  if (connection.isConnected) {
    console.log("MongoDb is already connected");
    return;
  }
  let db;
  try {
    connection.isConnected = true;
    db = await mongoose.connect(env.MONGO_URI, {
      dbName: "BookAPI",
    });
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log(error);
  } finally {
    connection.isConnected = db.connections[0].readyState; 
  }
};
