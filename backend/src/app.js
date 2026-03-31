const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
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

module.exports = app;