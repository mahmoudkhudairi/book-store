const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
  toggleFavorites,
  getLoggedInUserInfo,
} = require('../controllers/user');
router.use(authenticate);
/**
 * @swagger
 * /api/users/user-info:
 *   get:
 *     summary: get loggedin user info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The logged in user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *                _id: asdasd32e33sd2323
 *                name: John Doe
 *                email: john@gmail.com
 *                profilePicture: link
 *                role: User
 *                favDict: {}
 *       500:
 *         description: server error
 */
router.get('/user-info', getLoggedInUserInfo);
/**
 * @swagger
 * /api/users/profile/{userName}:
 *   get:
 *     summary: get user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: user name
 *     responses:
 *       200:
 *         description: The user profile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *                _id:""
 *                name:""
 *                email:""
 *                about:""
 *                favoriteBooks:[]
 *                books:[]
 *       500:
 *         description: server error
 */
router.get('/profile/:username', getUserProfile);
/**
 * @swagger
 * /api/users/profile/{userName}:
 *   put:
 *     summary: update user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: user name
 *     requestBody:
 *       description: user content
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *              profilePicture: ""
 *              about: ""
 *
 *     responses:
 *       200:
 *         description: The comment updated object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *                _id:""
 *                name:""
 *                email:""
 *                about:""
 *                favoriteBooks:[]
 *                books:[]
 *       500:
 *         description: server error
 */
router.put('/profile/:username', updateUserProfile);
/**
 * @swagger
 * /api/users/favorite/{bookId}:
 *   put:
 *     summary: update user favorite books
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: book id
 *     requestBody:
 *       description: flag
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: boolean
 *           example:
 *              addToFav: true
 *
 *     responses:
 *       200:
 *         description: The user updated object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: server error
 */
router.route('/favorite/:id').put(toggleFavorites);
module.exports = router;
