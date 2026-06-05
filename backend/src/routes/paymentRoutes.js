const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protected Booking Step 1: Initiate booking/order
router.post('/initiate', verifyToken, paymentController.initiateBooking);

// Protected Booking Step 2: Validate transaction capture and process ticket passes
router.post('/verify', verifyToken, paymentController.verifyPayment);

module.exports = router;
