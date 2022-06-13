const Book = require('../models/book');
const ErrorResponse = require('../utils/errorResponse');

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({}).populate('createdBy', 'name email');
    res.json(books);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create({ ...req.body, createdBy: req.user._id });
    res.json(newBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const getBookById = async (req, res, next) => {
  const {
    params: { id: _id },
  } = req;
  try {
    const book = await Book.findOne({ _id });
    res.json(book);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json(deletedBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const updateBook = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    res.json(updatedBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

module.exports = { getBooks, createBook, getBookById, deleteBook, updateBook };
