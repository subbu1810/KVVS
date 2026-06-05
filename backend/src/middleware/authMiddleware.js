const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'quantum_zero_secret_token_key_3026';

/**
 * Middleware verifying standard JWT tokens for users/admins.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Authentication token is required.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Bearer token format invalid.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication session expired or invalid.' });
  }
};

/**
 * Middleware restricting access to Admin-only roles.
 */
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Administrator clearance level required.' });
    }
    next();
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  JWT_SECRET
};
