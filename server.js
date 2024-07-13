const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const Book = require("./models/Book");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Mongo Db
connectDb();

// app.use("/api/hello", (req, res) => {
//   res.send("Hello");
// });

// app.use("/test", async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     console.log("Getting All Books Error");
//     res.status(500).json({ message: error.message });
//   }
// });

app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listen on PORT http://localhost:${PORT}`);
});
