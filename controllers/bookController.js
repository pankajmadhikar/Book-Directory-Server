const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log("Getting All Books Error");
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!!book) {
      res.json(book);
    } else {
      res.status(400).message({ message: "book not found" });
    }
  } catch (error) {
    console.log("Getting Single Book Error");
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publishedYear: req.body.publishedYear,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.uploadBookPDF = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.pdfPath = req.file.path;
    await book.save();

    res.status(200).json({ message: "PDF uploaded successfully", book });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const isBookId = req.body.id;
    if (isBookId) {
      const updatedBook = await Book.findByIdAndUpdate(isBookId, {
        title: req.body.title,
        auther: req.body.auther,
        description: req.body.description,
        publishedYear: req.body.publishedYear,
        pdfPath: req.body.path,
      });
      console.log("updatedBook", updatedBook);
      res.status(200).json(updateBook);
    } else {
      res.status(400).message({ message: "book not found" });
    }
  } catch (error) {
    console.log("Getting error update book");
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const isBookId = req.body.id;
    if (isBookId) {
      const deletedBook = await Book.deleteOne({ _id: req.body.id });
      console.log("Book deleted ", deletedBook);
      res.status(200).send({
        success: true,
        message: "book delete success",
        data: deletedBook,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "book not found",
      });
    }
  } catch (error) {
    console.log("Getting error deleting book");
    res.status(500).json({ message: error.message });
  }
};
