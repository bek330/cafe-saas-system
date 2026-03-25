const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Category routes
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/categories", categoryRoutes);

// Menu routes
const menuRoutes = require("./routes/menuRoutes");

app.use("/api/menu", menuRoutes);

// Order routes
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

// QR code routes
const qrRoutes = require("./routes/qrRoutes");

app.use("/api/qr", qrRoutes);

// DB TEST ROUTE
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({ error: "Database test failed" });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});