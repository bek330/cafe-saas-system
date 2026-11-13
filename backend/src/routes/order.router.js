const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// Customers can submit orders without an account.
router.post('/', controller.createOrder);

// Order queues and status changes are restricted to administrators.
router.get('/', verifyToken, requireRole('admin'), controller.getOrders);
router.put('/:id/status', verifyToken, requireRole('admin'), controller.updateStatus);
router.get('/history', verifyToken, requireRole('admin'), controller.getOrderHistory);

module.exports = router;
