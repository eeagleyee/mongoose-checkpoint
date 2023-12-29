const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function connectDB() {
  try {
    const connected = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connected) {
      console.log("Database was successfully connected.");
    }
  } catch (error) {
    console.error({ errorName: error.name, message: error.message });
    throw error;
  }
};
