const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

// Generate QR for a table
router.get("/:tableNumber", async (req, res) => {
  try {
    const { tableNumber } = req.params;

    const url = `http://localhost:3000/menu?table=${tableNumber}`;

    const qr = await QRCode.toDataURL(url);

    res.json({
      table: tableNumber,
      url,
      qr,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "QR generation failed" });
  }
});

module.exports = router;