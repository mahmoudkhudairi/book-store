const express = require('express');
const authenticate = require('../middleware/auth');
const acl = require('../middleware/acl');
const router = express.Router();
const {
  getBooks,
  getPublicBooks,
  getPublicBookById,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book');
/**
 * @swagger
 * /api/books/public:
 *   get:
 *     summary: Get the books from google api
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: page number
 *     responses:
 *       200:
 *         description: Array of books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *                [{}]
 *       500:
 *         description: server error
 */
router.route('/public').get(getPublicBooks);
/**
 * @swagger
 * /api/books/{id}/public:
 *   get:
 *     summary: Get book by id from google api
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *     responses:
 *       200:
 *         description: The book object by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: server error
 */
router.route('/public/:id').get(getPublicBookById);
router.use(authenticate);
/**
 * @swagger
 * /api/books/:
 *   get:
 *     summary: Get the books from db
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: page number
 *     responses:
 *       200:
 *         description: Array of books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *                [{}]
 */
/**
 * @swagger
 * /api/books/:
 *   post:
 *     summary: Get the books from db
 *     tags: [Books]
 *     parameters:
 *       - in: body
 *         schema:
 *            $ref: '#/components/schemas/Book'
 *         required: true
 *         description: book
 *     responses:
 *       200:
 *         description: created book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.route('/').get(getBooks).post(createBook);
/**
 * @swagger
 * /api/books/{id}/:
 *   get:
 *     summary: Get book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *     responses:
 *       200:
 *         description: The book object by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: server error
 */
/**
 * @swagger
 * /api/books/{id}/:
 *   put:
 *     summary: update book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *     requestBody:
 *        schema:
 *          $ref: '#/components/schemas/Book'
 *
 *     responses:
 *       200:
 *         description: The book object by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: server error
 */
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *     responses:
 *       200:
 *         description: The book object by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: server error
 */
router
  .route('/:id')
  .get(getBookById)
  .put(acl({ isComment: false }), updateBook)
  .delete(acl({ isComment: false }), deleteBook);
module.exports = router;
