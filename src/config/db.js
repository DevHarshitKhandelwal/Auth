const mongoose = require("mongoose");
const dns = require("dns");

// Set Google Public DNS for SRV record lookup on Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jwt_auth_db";
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
