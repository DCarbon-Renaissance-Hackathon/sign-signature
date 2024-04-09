import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseUri = process.env.DATABASE_URL ?? "";

const connectToDatabase = async () => {
  try {
    console.log("Connecting...!", databaseUri);
    await mongoose.connect(databaseUri);
    console.log("Connect to database success!");
  } catch (error) {
    console.error(error);
  }
};

const closeDatabaseConnection = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database connection closed successfully!");
  } catch (error) {
    console.error("Error while closing database connection:", error);
  }
};

export default { connectToDatabase, closeDatabaseConnection };
