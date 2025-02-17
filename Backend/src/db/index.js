import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async (req, res) => {
  try {
    console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
  } catch (error) {
    console.log("MONGODB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
