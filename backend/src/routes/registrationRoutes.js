const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protected User Booking History Ledger Route
router.get('/history', verifyToken, registrationController.getUserBookings);

module.exports = router;
