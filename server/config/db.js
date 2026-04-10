const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/meetx', {
      serverSelectionTimeoutMS: 5000, // 5 second timeout for local
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error('Make sure MongoDB is running locally (mongod)');
    isConnected = false;
    return null;
  }
};

const checkDBConnection = () => isConnected;

module.exports = { connectDB, checkDBConnection };
