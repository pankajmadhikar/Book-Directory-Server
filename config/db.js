const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Mongo DB connection success", mongoose.connection.host);
  } catch (error) {
    console.log("Mongo DB connection failed");
  }
};

module.exports = connectDb;
