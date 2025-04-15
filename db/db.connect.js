const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const mongo_uri = process.env.MONGO_URI;

const initialization = async () => {
  try {
    const connectDB = await mongoose.connect(mongo_uri);

    if (connectDB) console.log("Connected To MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initialization };
