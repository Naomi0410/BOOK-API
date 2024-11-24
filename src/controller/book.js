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
    const id = (req.params.id);
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
    const existingBook = await Book.findOne(req.body);
    if (existingBook) {
      return next(createHttpError(409, "Book already exists"));
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
      const id = (req.params.id);
      if (!isValidObjectId(id)) {
        return next(createHttpError(400, 'Invalid book ID'));
      }
      const book = await Book.findById(id);
      if (!book) {
        return next(createHttpError(404, 'Book not found'));
      }
      Object.assign(book, req.body);
      await book.save();
      res.json(book);
      
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteBookById = async (req, res, next) => {
    try {
      const id = (req.params.id);
      if (!isValidObjectId(id)) {
        next(createHttpError(400, 'Invalid book ID'));
      }
      await Book.findByIdAndDelete(id);
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
   