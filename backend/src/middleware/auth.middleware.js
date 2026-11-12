const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : authorization.trim();

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    return res.status(503).json({ error: 'JWT_SECRET must be configured with at least 32 characters' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  // Only the user ID from the token is trusted for looking up the current account.
  // Roles and other authorization data are always read from the database.
  if (!decoded || !Number.isSafeInteger(decoded.id) || decoded.id <= 0) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    const result = await pool.query(
      'SELECT id, username, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = result.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { verifyToken, requireRole };
