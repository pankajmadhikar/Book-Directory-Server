const express = require("express");
const router = express.Router();
const multer = require("multer");
const bookController = require("../controllers/bookController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.post("/createbook", bookController.createBook);
router.get("/getallbooks"), bookController.getAllBooks;
router.get("/getsinglebook/:id", bookController.getSingleBook);
router.post(
  "/uploadbook/:id",
  upload.single("pdf"),
  bookController.uploadBookPDF
);

router.put("updatebook/:id", upload.single("pdf"), bookController.updateBook);
router.delete("/delete/:id", bookController.deleteBook);

module.exports = router;
