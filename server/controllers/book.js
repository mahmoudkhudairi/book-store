const Book = require('../models/book');
const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');
const getPublicBooks = async (req, res, next) => {
  const booksPerPage = 10;
  const page = req.query.page === '0' ? 0 : Number(req.query.page) + booksPerPage;
  console.log('WHAT IS THE QUERY', req.query.page, 'WHAT IS THE PAGE', page);
  // if (process.env.NODE_ENV === 'production') {
  try {
    const {
      data: { items },
    } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=programming&printType=books&orderBy=newest&startIndex=${page}&maxResults=${booksPerPage}&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
    );
    let books = [];
    if (items) {
      books = items.reduce((acc, item) => {
        const book = new PublicBook(item);
        acc.push(book);
        return acc;
      }, []);
    }

    res.json(books);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
  // } else {
  //   res.json(require('../models/booksApiSample'));
  // }
};
const getPublicBookById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const book = new PublicBook(data);
    res.json(book);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const getBooks = async (req, res, next) => {
  const page = Number(req.query.page) || 0;
  const booksPerPage = 10;
  //due to MongoDB 4.4 known bug with sorting adding _id resolve duplicate of noneUnique values on sorting
  try {
    const books = await Book.find({ status: 'APPROVED' })
      .sort({ createdAt: -1, _id: -1 })
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .populate('createdBy', '_id name email');
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
    next(new ErrorResponse(err.message, err.errors));
  }
};

const getBookById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const book = await Book.findById(id)
      .where('status')
      .equals('APPROVED')
      .populate('createdBy', '_id name email');
    res.json(book);
  } catch (err) {
    next(new ErrorResponse(`cannot find book with id ${id}`));
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
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', '_id name email');
    res.json(updatedBook);
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};
const getDashboardData = async (req, res, next) => {
  const page = Number(req.query.page) || 0;
  const booksPerPage = Number(req.query.booksPerPage) || 10;
  //due to MongoDB 4.4 known bug with sorting adding _id resolve duplicate of noneUnique values on sorting
  try {
    const books = await Book.find({})
      .sort({ status: -1, createdAt: -1, _id: -1 })
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .populate('createdBy', '_id name email');
    const booksCount = await Book.count({});
    res.json({ books, booksCount });
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};

module.exports = {
  getBooks,
  getPublicBooks,
  getPublicBookById,
  createBook,
  getBookById,
  deleteBook,
  updateBook,
  getDashboardData,
};

class PublicBook {
  constructor({ volumeInfo, id }) {
    const { title, authors, publisher, publishedDate, imageLinks, description } = volumeInfo;
    this.title = title || 'N/A';
    this.authors = authors || 'N/A';
    this.publisher = publisher || 'N/A';
    this.publishedDate = publishedDate || 'N/A';
    this.imageUrl = imageLinks ? imageLinks.thumbnail : volumeInfo.previewLink;
    this.description = description || 'N/A';
    this._id = id;
  }
}
