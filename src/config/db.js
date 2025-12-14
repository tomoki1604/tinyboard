import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('Failed to connect MongoDB...', error);
    process.exit(1);
  }
};
