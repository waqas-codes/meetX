const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/meetx');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Server will continue running without database...');
    console.error('To fix: Check your internet connection and MongoDB Atlas settings');
    // Don't exit - let server run without DB for now
    return null;
  }
};

module.exports = connectDB;
