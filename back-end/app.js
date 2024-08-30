import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import user from "./routes/user.js";
import book from "./routes/book.js";
import favorite from "./routes/favorite.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";

const app = express();

mongoose.connect(process.env.DB_CONNECT, (e) =>
  console.log("Error connecting to DB: " + e)
);

app.use(cors());
app.use(express.json());

//routes
app.use("/api", user);
app.use("/api", book);
app.use("/api", favorite);
app.use("/api", cart);
app.use("/api", order);

//create port
app.listen(process.env.PORT, () =>
  console.log(`server is running on port: ${process.env.PORT}`)
);
