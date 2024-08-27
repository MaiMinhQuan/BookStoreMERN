import express from "express";
import Order from "../models/order.js";
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";
import { populate } from "dotenv";

const router = express.Router();

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const { order } = req.body;

    for (const orderData of order) {
      const orderDataFromDb = await Order.create({
        user: id,
        book: orderData._id,
      });

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Place order successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const orderData = userData.orders.reverse();

    return res.status(200).json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-all-order", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-order-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { status: req.body.status });

    return res.status(200).json({
      status: "Success",
      message: "Update order status successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
