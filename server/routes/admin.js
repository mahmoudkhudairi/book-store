const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authenticateAdmin = require('../middleware/admin');
const { getDashboardData, updateBook } = require('../controllers/book');
router.use(authenticate);
router.use(authenticateAdmin);
router.get('/dashboard', getDashboardData);
router.put('/dashboard/update-status/:id', updateBook);

module.exports = router;
