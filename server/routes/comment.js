const express = require('express');
const authenticate = require('../middleware/auth');
const acl = require('../middleware/acl');
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

router.use(authenticate);
/**
 * @swagger
 * /api/books/{bookId}/comments:
 *   get:
 *     summary: Get the book comments from db
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: page number
 *     responses:
 *       200:
 *         description: Array of comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *                [{}]
 *       500:
 *         description: server error
 */
router.route('/:bookId/comments').get(getComments);
/**
 * @swagger
 * /api/books/{bookId}/add-comment:
 *   post:
 *     summary: Add comment to the book Id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *     requestBody:
 *       description: comment content
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *              content: first comment
 *     responses:
 *       200:
 *         description: created book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
router.route('/:bookId/add-comment').post(addComment);
/**
 * @swagger
 * /api/books/{bookId}/comments/{commentId}:
 *   put:
 *     summary: update comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: comment id
 *     requestBody:
 *       description: comment content
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *              content: first comment
 *
 *     responses:
 *       200:
 *         description: The comment updated object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: server error
 */
/**
 * @swagger
 * /api/books/{bookId}/comments/{commentId}:
 *   delete:
 *     summary: delete comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: comment id
 *     responses:
 *       200:
 *         description: The comment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: server error
 */
router
  .route('/:bookId/comments/:commentId')
  .put(acl({ isComment: true }), updateComment)
  .delete(acl({ isComment: true }), deleteComment);
module.exports = router;
