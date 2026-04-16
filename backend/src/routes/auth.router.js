const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ⚠️ for now hardcoded (later we use DB)
  if (username === "admin" && password === "1234") {
    return res.json({ token: "admin-token" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;