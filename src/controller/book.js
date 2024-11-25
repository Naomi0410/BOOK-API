import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import Book from "../model/book.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return next(createHttpError(400, "Invalid book ID"));
    }
    const book = await Book.findById(id);
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, author, genre } = req.body;

    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({
          message: "Please provide all required fields (title, author, genre)",
        });
    }

    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res
        .status(409)
        .json({ message: "Book with this title already exists" });
    }

    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;

    if (!id) {
      return next(createHttpError(400, "Book ID is required"));
    }
    if (!isValidObjectId(id)) {
      return next(createHttpError(400, "Invalid book ID"));
    }
    if (!title && !author && !genre) {
      return next(
        createHttpError(400, "Please provide at least one field to update")
      );
    }
    const book = await Book.findById(id);
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    const allowedFields = ["title", "author", "genre"];
    Object.keys(req.body).forEach((field) => {
      if (!allowedFields.includes(field)) {
        return next(createHttpError(400, `Invalid field: ${field}`));
      }
    });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      next(createHttpError(400, "Invalid book ID"));
    }
    await Book.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
