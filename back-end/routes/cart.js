import express from "express";
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

const router = express.Router();

router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isInCart = userData.cart.includes(bookid);

    if (isInCart) {
      return res.status(200).json({ message: "Book is already in cart" });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

    return res.status(200).json({ message: "Add book to cart successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put(
  "/remove-book-from-cart/:bookid",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      const userData = await User.findById(id);
      const isInCart = userData.cart.includes(bookid);

      if (!isInCart) {
        return res.status(200).json({ message: "Book is not in cart" });
      }

      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
      return res
        .status(200)
        .json({ message: "Remove book from cart successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/get-book-from-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    return res.status(200).json({ status: "Success", data: cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
