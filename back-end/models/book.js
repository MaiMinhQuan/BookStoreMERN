import mongoose from "mongoose";

const book = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "Fantasy",
        "Science Fiction",
        "Action & Adventure",
        "Romance",
        "Horror",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("books", book);
