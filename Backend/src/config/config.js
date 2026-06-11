const dotenv = require('dotenv'); // Use require

dotenv.config();

const configs = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  RAZORPAY_ID: process.env.RAZORAPY_ID,
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET
};

module.exports = configs;