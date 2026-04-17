const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// ⚠️ move this later to .env
const SECRET = "mysecretkey";

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // simple check (later DB)
  if (username === 'admin' && password === '1234') {

    const token = jwt.sign(
      { username: 'admin', role: 'admin' }, // payload
      SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;