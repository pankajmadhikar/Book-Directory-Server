const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  pdfPath: {
    type: String,
  },
});

module.exports = mongoose.model("Book", BookSchema);
