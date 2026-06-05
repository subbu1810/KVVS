const bcrypt = require('bcryptjs');
const { Registration, Payment, Pass, User, Product, Event, Attendance } = require('../models');
const { Op } = require('sequelize');

/**
 * Compile analytical and financial metrics for the dashboard home.
 */
const getDashboardAnalytics = async (req, res) => {
  try {
    // 1. Total registered attendees
    const totalUsers = await User.count({ where: { role: 'user' } });

    // 2. Booking indicators
    const confirmedBookings = await Registration.count({ where: { status: 'confirmed' } });
    const pendingBookings = await Registration.count({ where: { status: 'pending' } });

    // 3. Financial calculations
    const capturedPayments = await Payment.findAll({ where: { status: 'captured' } });
    const totalRevenue = capturedPayments.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    // 4. Seated slots
    const event = await Event.findOne({ order: [['date', 'ASC']] });
    const totalSlots = event ? event.total_slots : 0;
    const availableSlots = event ? event.available_slots : 0;
    const bookedSlots = totalSlots - availableSlots;

    // 5. Product-wise distribution
    const products = await Product.findAll();
    const productStats = [];

    for (const prod of products) {
      const count = await Registration.count({
        where: { product_id: prod.id, status: 'confirmed' }
      });
      productStats.push({
        id: prod.id,
        name: prod.name,
        kw: prod.kw_capacity,
        bookings: count,
        revenue: count * parseFloat(event ? event.ticket_price : 0)
      });
    }

    // 6. Recent bookings list
    const recentBookings = await Registration.findAll({
      include: [User, Product, Event, Payment],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    return res.json({
      metrics: {
        totalUsers,
        confirmedBookings,
        pendingBookings,
        totalRevenue,
        totalSlots,
        availableSlots,
        bookedSlots
      },
      productStats,
      recentBookings
    });
  } catch (error) {
    console.error('Fetch Analytics Error:', error);
    return res.status(500).json({ message: 'Failed to compile analytical data.' });
  }
};

/**
 * Fetch registrations grid list.
 */
const getAllRegistrations = async (req, res) => {
  try {
    const list = await Registration.findAll({
      include: [User, Product, Event, Payment, Pass],
      order: [['createdAt', 'DESC']]
    });
    return res.json(list);
  } catch (error) {
    console.error('Fetch Registrations Error:', error);
    return res.status(500).json({ message: 'Failed to retrieve registrations list.' });
  }
};

/**
 * Gate check-in ticket validation using scanned QR codes or pass IDs.
 */
const validatePass = async (req, res) => {
  try {
    const { pass_id } = req.body;
    const admin_id = req.user.id;

    if (!pass_id) {
      return res.status(400).json({ message: 'Verification Pass ID is required.' });
    }

    // Fetch the pass
    const pass = await Pass.findOne({
      where: { pass_id },
      include: [
        {
          model: Registration,
          include: [User, Product, Event]
        }
      ]
    });

    if (!pass) {
      return res.status(404).json({
        valid: false,
        message: 'INVALID TICKET PASS. Alphanumeric hash not found in database registry.'
      });
    }

    const registration = pass.Registration;

    if (registration.status !== 'confirmed') {
      return res.status(400).json({
        valid: false,
        message: 'INVALID REGISTRATION. Payment for this pass has not been verified.'
      });
    }

    // Check for double entry fraud
    const existingCheckIn = await Attendance.findOne({ where: { pass_id: pass.id } });
    if (existingCheckIn) {
      const scanDate = new Date(existingCheckIn.scanned_at).toLocaleString();
      return res.status(400).json({
        valid: false,
        duplicate: true,
        message: 'DOUBLE ENTRY VIOLATION! Pass already verified at entrance.',
        scan_time: scanDate,
        attendee: {
          name: registration.User.name,
          email: registration.User.email,
          booking_id: registration.booking_id,
          model: registration.Product.name
        }
      });
    }

    // Log check-in and mark gate attendance
    const attendance = await Attendance.create({
      pass_id: pass.id,
      scanned_by: admin_id,
      scanned_at: new Date(),
      status: 'checked_in'
    });

    return res.json({
      valid: true,
      message: 'ENTRY PASS CONFIRMED. Welcome to the launch event!',
      attendee: {
        name: registration.User.name,
        email: registration.User.email,
        mobile: registration.User.mobile,
        booking_id: registration.booking_id,
        model: registration.Product.name,
        capacity: registration.Product.kw_capacity,
        scanned_at: attendance.scanned_at
      }
    });
  } catch (error) {
    console.error('Validate Pass Error:', error);
    return res.status(500).json({ message: 'Error checking pass verification code.' });
  }
};

// ─────────────────────────────────────────
// USER MANAGEMENT
// ─────────────────────────────────────────

/**
 * Get all registered users with booking count.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'mobile', 'address', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    // Attach booking count per user
    const usersWithStats = await Promise.all(users.map(async (u) => {
      const bookingCount = await Registration.count({ where: { user_id: u.id } });
      const confirmedCount = await Registration.count({ where: { user_id: u.id, status: 'confirmed' } });
      return { ...u.toJSON(), bookingCount, confirmedCount };
    }));

    return res.json(usersWithStats);
  } catch (error) {
    console.error('Get All Users Error:', error);
    return res.status(500).json({ message: 'Failed to retrieve users list.' });
  }
};

/**
 * Update a user's details (name, mobile, address) by admin.
 */
const updateUser = async (req, res) => {
  try {
    const { name, mobile, address, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await user.update({
      name: name || user.name,
      mobile: mobile || user.mobile,
      address: address || user.address,
      role: role || user.role
    });
    return res.json({ message: 'User profile updated.', user });
  } catch (error) {
    console.error('Update User Error:', error);
    return res.status(500).json({ message: 'Failed to update user.' });
  }
};

/**
 * Delete a user account.
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    await user.destroy();
    return res.json({ message: 'User account permanently removed.' });
  } catch (error) {
    console.error('Delete User Error:', error);
    return res.status(500).json({ message: 'Failed to delete user.' });
  }
};

// ─────────────────────────────────────────
// PAYMENT MANAGEMENT
// ─────────────────────────────────────────

/**
 * Get all payments with linked registration, user, and product data.
 */
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Registration,
          include: [User, Product, Event]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.json(payments);
  } catch (error) {
    console.error('Get All Payments Error:', error);
    return res.status(500).json({ message: 'Failed to retrieve payment records.' });
  }
};

/**
 * Manually override payment status (admin force-verify or cancel).
 */
const updatePaymentStatus = async (req, res) => {
  try {
    const { status, transaction_id } = req.body;
    const validStatuses = ['pending', 'captured', 'failed', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const payment = await Payment.findByPk(req.params.id, {
      include: [{ model: Registration }]
    });
    if (!payment) return res.status(404).json({ message: 'Payment record not found.' });

    await payment.update({
      status,
      transaction_id: transaction_id || payment.transaction_id
    });

    // Sync registration status to match payment
    if (payment.Registration) {
      const regStatus = status === 'captured' ? 'confirmed' :
                        status === 'failed' || status === 'refunded' ? 'cancelled' : 'pending';
      await payment.Registration.update({ status: regStatus });
    }

    return res.json({ message: `Payment status updated to "${status}".`, payment });
  } catch (error) {
    console.error('Update Payment Status Error:', error);
    return res.status(500).json({ message: 'Failed to update payment status.' });
  }
};

/**
 * Cancel a registration and its associated payment.
 */
const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id, {
      include: [Payment]
    });
    if (!registration) return res.status(404).json({ message: 'Registration not found.' });

    await registration.update({ status: 'cancelled' });
    if (registration.Payment) {
      await registration.Payment.update({ status: 'refunded' });
    }

    return res.json({ message: 'Registration cancelled and payment marked as refunded.' });
  } catch (error) {
    console.error('Cancel Registration Error:', error);
    return res.status(500).json({ message: 'Failed to cancel registration.' });
  }
};

module.exports = {
  getDashboardAnalytics,
  getAllRegistrations,
  validatePass,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllPayments,
  updatePaymentStatus,
  cancelRegistration
};

