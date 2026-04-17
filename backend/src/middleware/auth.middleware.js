const jwt = require('jsonwebtoken');

const SECRET = "mysecretkey";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(authHeader, SECRET);

    req.user = decoded; // attach user info
    next();

  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};