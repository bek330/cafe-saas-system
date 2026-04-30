
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'fallbacksecret';

// In-memory users with hashed passwords (for demo)
const users = [
  {
    username: 'admin',
    // password: 1234
    password: '$2b$10$bnwtPubRafgpkxRTUMu3He5V4eP8rF9YXNKwMFVBeuFXZOtvVWphC',
    role: 'admin',
  },
  {
    username: 'kitchen',
    // password: 1234
    password: '$2b$10$bnwtPubRafgpkxRTUMu3He5V4eP8rF9YXNKwMFVBeuFXZOtvVWphC',
    role: 'kitchen',
  },
];

// TODO: Add express-validator for input validation
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

module.exports = router;