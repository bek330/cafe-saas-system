const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "mysecretkey";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};