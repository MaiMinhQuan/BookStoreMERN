import express from "express";
import Book from "../models/book.js";
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

const router = express.Router();

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user && user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You do not have admin permission" });
    }

    const { url, title, author, price, desc, language } = req.body;

    if (!title || !author || !price || !desc || !language) {
      return res
        .status(500)
        .json({ message: "Missing required book information" });
    }

    await Book.create({
      url: url,
      title: title,
      author: author,
      price: price,
      desc: desc,
      language: language,
    });

    return res.status(200).json({ message: "Add book successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const { url, title, author, price, desc, language } = req.body;
    await Book.findByIdAndUpdate(bookid, {
      url: url,
      title: title,
      author: author,
      price: price,
      desc: desc,
      language: language,
    });

    return res.status(200).json({ message: "Update book successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Delete book successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "Success", data: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ status: "Success", data: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({ status: "Success", data: book });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
