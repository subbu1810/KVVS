const crypto = require('crypto');
const Razorpay = require('razorpay');
const { Registration, Payment, Pass, User, Product, Event } = require('../models');
const { generateQRCode } = require('../services/qrService');
const { generatePassPDF } = require('../services/pdfService');
const { sendPassEmail } = require('../services/emailService');
require('dotenv').config();

// Initialize Razorpay SDK if credentials are present
let razorpay = null;
const isDemoMode = !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'MOCK';

if (!isDemoMode) {
  try {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('Payment Controller: Active Razorpay Gateway enabled.');
  } catch (error) {
    console.error('Payment Controller: Failed to initialize Razorpay SDK:', error);
  }
} else {
  console.log('Payment Controller: Razorpay Demo Mode simulation active.');
}

/**
 * Step 1: Initialize launch event registration and request Razorpay Order ID.
 */
const initiateBooking = async (req, res) => {
  try {
    const { product_id, event_id } = req.body;
    const user_id = req.user.id;

    if (!product_id || !event_id) {
      return res.status(400).json({ message: 'Product ID and Event ID are required to register.' });
    }

    const product = await Product.findByPk(product_id);
    const event = await Event.findByPk(event_id);

    if (!product || !event) {
      return res.status(404).json({ message: 'Selected generator model or launch event does not exist.' });
    }

    if (event.available_slots <= 0) {
      return res.status(400).json({ message: 'Launch event entry slots are fully booked.' });
    }

    // Generate unique booking identifier
    const booking_id = `QP-3026-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create a pending Registration
    const registration = await Registration.create({
      user_id,
      product_id,
      event_id,
      booking_id,
      status: 'pending'
    });

    const bookingAmount = event.ticket_price; // Booking amount
    let order_id = `order_mock_${Math.random().toString(36).substring(2, 11)}`;

    if (!isDemoMode && razorpay) {
      // Create real Razorpay order (amount in paise)
      const options = {
        amount: Math.round(bookingAmount * 100),
        currency: 'INR',
        receipt: booking_id
      };
      
      const order = await razorpay.orders.create(options);
      order_id = order.id;
    }

    // Save pending payment record in DB
    const payment = await Payment.create({
      registration_id: registration.id,
      order_id,
      amount: bookingAmount,
      status: 'pending'
    });

    return res.status(201).json({
      message: 'Booking checkout initiated.',
      registration_id: registration.id,
      booking_id,
      order_id,
      amount: bookingAmount,
      is_demo: isDemoMode,
      key_id: isDemoMode ? 'MOCK' : process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Initiate Booking Error:', error);
    return res.status(500).json({ message: 'Failed to initiate launch event checkout.' });
  }
};

/**
 * Step 2: Verification of transaction signatures and digital pass compilation.
 */
const verifyPayment = async (req, res) => {
  try {
    const { registration_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!registration_id || !razorpay_order_id) {
      return res.status(400).json({ message: 'Registration parameters and Order ID are required.' });
    }

    const registration = await Registration.findByPk(registration_id, {
      include: [User, Product, Event]
    });

    if (!registration) {
      return res.status(404).json({ message: 'Associated event registration record not found.' });
    }

    const payment = await Payment.findOne({ where: { registration_id: registration.id, order_id: razorpay_order_id } });
    if (!payment) {
      return res.status(404).json({ message: 'Transaction record mismatch.' });
    }

    let isVerified = false;

    if (isDemoMode) {
      // Bypass standard verification in Demo Mode
      isVerified = true;
      console.log('Payment Verification: Bypassing signature check for Demo checkout.');
      
      await payment.update({
        transaction_id: razorpay_payment_id || `pay_mock_${Math.random().toString(36).substring(2, 11)}`,
        status: 'captured',
        signature: 'demo_simulation_signature'
      });
    } else {
      // Live Signature verification
      if (!razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: 'Missing transaction capture parameters.' });
      }

      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature === razorpay_signature) {
        isVerified = true;
        await payment.update({
          transaction_id: razorpay_payment_id,
          status: 'captured',
          signature: razorpay_signature
        });
      } else {
        await payment.update({ status: 'failed' });
        await registration.update({ status: 'cancelled' });
        return res.status(400).json({ message: 'Payment validation signature signature mismatch. Rejected.' });
      }
    }

    if (isVerified) {
      // Update registration status to confirmed
      await registration.update({ status: 'confirmed' });

      // Deduct available slots from the launch event
      const event = registration.Event;
      if (event.available_slots > 0) {
        await event.update({ available_slots: event.available_slots - 1 });
      }

      // Generate a unique digital pass verification code
      const pass_id = `PASS-${Math.floor(100000 + Math.random() * 900000)}`;

      // Generate base64 QR code data URL (encodes the unique Pass ID)
      const qrCodeUrl = await generateQRCode(pass_id);

      // Save pass model details
      const newPass = await Pass.create({
        registration_id: registration.id,
        pass_id,
        qr_code_url: qrCodeUrl
      });

      // Generate PDF pass on server
      const pdfPath = await generatePassPDF({
        user: registration.User,
        product: registration.Product,
        event: registration.Event,
        booking_id: registration.booking_id,
        pass_id,
        qr_code_url: qrCodeUrl
      });

      // Update pass with path to PDF
      await newPass.update({ pdf_url: pdfPath });

      // Dispatch Email with pass attachment via Nodemailer
      await sendPassEmail(
        registration.User.email,
        registration.User.name,
        {
          booking_id: registration.booking_id,
          pass_id,
          product_name: registration.Product.name,
          event_title: registration.Event.title,
          event_date: registration.Event.date,
          event_venue: registration.Event.venue
        },
        pdfPath
      );

      return res.json({
        message: 'Transaction captured and boarding pass processed successfully.',
        booking_id: registration.booking_id,
        pass: {
          id: newPass.id,
          pass_id: newPass.pass_id,
          qr_code_url: newPass.qr_code_url,
          pdf_url: newPass.pdf_url
        }
      });
    }
  } catch (error) {
    console.error('Payment Verification Error:', error);
    return res.status(500).json({ message: 'Verification error processing transaction.' });
  }
};

module.exports = {
  initiateBooking,
  verifyPayment
};
