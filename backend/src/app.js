const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['https://safeland-cafe.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());


// Import routes
// Import category routes
const categoryRoutes = require('./routes/category.router');
app.use('/categories', categoryRoutes);

// Import menu item routes
const menuRoutes = require('./routes/menu.router');
app.use('/menu', menuRoutes);

// Import order routes
const orderRoutes = require('./routes/order.router');
app.use('/orders', orderRoutes);

// Import auth routes
const authRoutes = require("./routes/auth.router");
app.use("/auth", authRoutes);

// Import user routes
const userRoutes = require("./routes/user.router");
app.use("/users", userRoutes);

// Import upload routes
const uploadRoutes = require("./routes/upload.router");
app.use("/upload", uploadRoutes);

const adminDashboardRoutes = require(
    "./routes/adminDashboard.router"
);
app.use("/admin/dashboard", adminDashboardRoutes);

// Error handling middleware
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

module.exports = app;
