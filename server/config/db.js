import mongoose from 'mongoose';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
const connectDB = async () => {
  const dbUrl = process.env.DATABASE_URI;

  if (!dbUrl) {
    console.error('DB uri not found');
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUrl);
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;