import mongoose from "mongoose";
require('dotenv').config();

const mongodbUrl = process.env.MONGO_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUrl);

    console.log('MongoDB Connected!');
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
