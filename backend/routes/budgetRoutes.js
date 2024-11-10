const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getBudgets } = require('../controllers/budgetController');

// Apply authMiddleware to protect this route
router.get('/:userId', authMiddleware, getBudgets);

module.exports = router;