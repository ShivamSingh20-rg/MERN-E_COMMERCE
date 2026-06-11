const config = require('./config')
const mongoose = require('mongoose')


 
const connectDB = () => {
mongoose.connect(config.MONGO_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Database connection error:", err));
 }

 module.exports = {connectDB}