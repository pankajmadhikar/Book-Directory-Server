const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Mongo Db
connectDb();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listen on PORT http://localhost:${PORT}`);
});
