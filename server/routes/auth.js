const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/user');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register User in the app
 *     tags: [Auth]
 *     requestBody:
 *       description: user object to be registered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             example:
 *                successMessage: user created!
 *                user:
 *                  _id: 630aab0ad9f63c99b4fdc328
 *                  name: John Doe
 *                  email: john@gmail.com
 *                  role: USER
 *       500:
 *         description: The user was not created
 *         content:
 *           application/json:
 *             example:
 *                message:
 *                errors:
 */
router.post('/register', register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login User into the app
 *     tags: [Auth]
 *     requestBody:
 *       description: user email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *              email: john@gmail.com
 *              password: superPassword
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             example:
 *                successMessage: logged in Successfully
 *                user:
 *                  _id: 630aab0ad9f63c99b4fdc328
 *                  name: John Doe
 *                  email: john@gmail.com
 *                  role: USER
 *       401:
 *         description: The user was not created
 *         content:
 *           application/json:
 *             example:
 *                message: Invalid email or password
 *                errors:
 */
router.post('/login', login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: logout user from the app
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             example:
 *                message: You have successfully logged out!
 */
router.post('/logout', logout);

module.exports = router;
