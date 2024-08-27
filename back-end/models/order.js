import mongoose from "mongoose";
import user from "./user.js";

const order = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
    status: {
      type: String,
      default: "Order placed",
      enum: ["Order placed", "Out for delivery", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", order);
