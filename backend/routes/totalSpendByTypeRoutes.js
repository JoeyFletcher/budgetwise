const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTotalSpendByType } = require('../controllers/totalSpendByTypeController');

// Apply authMiddleware to protect this route
router.get('/:userId/:year/:month', authMiddleware, getTotalSpendByType);

module.exports = router;
