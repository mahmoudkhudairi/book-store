const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authenticateAdmin = require('../middleware/admin');
const { getDashboardData, updateBook } = require('../controllers/book');
router.use(authenticate);
router.use(authenticateAdmin);
/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get books
 *     tags: [Admin]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: string
 *         required: false
 *         description: The page number
 *       - name: booksPerPage
 *         in: query
 *         schema:
 *           type: string
 *           required: false
 *           description: The number pf books per page
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *                books: []
 *                booksCount: 0
 *       401:
 *         description: User Not authorized
 *         content:
 *           application/json:
 *             example:
 *                message: Unauthorized user
 *                errors: null
 *
 */
router.get('/dashboard', getDashboardData);
/**
 * @swagger
 * /api/admin/dashboard/update-status/{id}:
 *   put:
 *     summary: update book status by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       description: book status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             enum: ["APPROVED","REJECTED","PENDING"]
 *           example:
 *            status: APPROVED
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: User Not authorized
 *         content:
 *           application/json:
 *             example:
 *                message: Unauthorized user
 *                errors: null
 *       500:
 *         description: Status Not in enum
 *         content:
 *           application/json:
 *             example:
 *                message: 'validation failed: status:  is not a valid enum value for path `status`.'
 *                errors: {}
 *
 */
router.put('/dashboard/update-status/:id', updateBook);

module.exports = router;
