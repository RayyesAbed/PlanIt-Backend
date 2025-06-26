import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const mongooseConnect = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set!");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting with MongoDB:", error);
    process.exit(1);
  }
};

export default mongooseConnect;
