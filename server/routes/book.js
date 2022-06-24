const express = require('express');
const authenticate = require('../middlewares/auth');
const acl = require('../middlewares/acl');
const router = express.Router();
const cloudinary = require('../middlewares/cloudinary');
const {
  getBooks,
  getPublicBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  addToFavorites,
  deleteFromFavorites,
} = require('../controllers/book');
router.route('/public').get(getPublicBooks);
router.use(authenticate);
router.route('/').get(getBooks).post(cloudinary, createBook);
router.route('/:id').get(getBookById).put(acl, updateBook).delete(acl, deleteBook);
router.route('/favorite/:id').post(addToFavorites).delete(deleteFromFavorites);
module.exports = router;
