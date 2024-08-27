import express from "express";
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

const router = express.Router();

router.put("/add-book-to-favorite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isFavoriteBook = userData.favorites.includes(bookid);

    if (isFavoriteBook) {
      return res.status(200).json({ message: "Book is already in favorites" });
    }

    await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });

    return res
      .status(200)
      .json({ message: "Add book to favorites successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put(
  "/remove-book-from-favorite",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isFavoriteBook = userData.favorites.includes(bookid);

      if (!isFavoriteBook) {
        return res.status(200).json({ message: "Book is not in favorites" });
      }

      await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
      return res
        .status(200)
        .json({ message: "Remove book from favorites successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/get-favorite-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favorites");
    const favoriteBooks = userData.favorites;

    return res.status(200).json({ status: "Success", data: favoriteBooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
