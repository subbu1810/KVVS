const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Public Event Logistics Retrieval Route
router.get('/', eventController.getActiveEvent);

// Admin-Only Event Update Route
router.put('/:id', verifyAdmin, eventController.updateActiveEvent);

module.exports = router;
