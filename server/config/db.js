const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/meetx', {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error('Server will continue running without database...');
    console.error('To fix: Check your internet connection and MongoDB Atlas settings');
    isConnected = false;
    return null;
  }
};

const checkDBConnection = () => isConnected;

module.exports = { connectDB, checkDBConnection };
