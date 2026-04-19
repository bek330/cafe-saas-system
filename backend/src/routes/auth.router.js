const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET = "mysecretkey";

// simple in-memory users (temporary)
const users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "kitchen", password: "1234", role: "kitchen" },
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
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