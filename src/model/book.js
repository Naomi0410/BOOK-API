import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  author: String,
  genre: {
    type: String,
    enum: ["Comedy", "Romance", "Tragedy", "Horror"],
  },
});

const Book = model("Book", bookSchema);

export default Book;
