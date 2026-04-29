const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// both kitchen + admin can view
router.get('/', controller.getOrders);

// only admin updates
router.put('/:id/status', verifyToken, requireRole('admin'), controller.updateStatus);
router.get('/history', controller.getOrderHistory);
// public route to create order
router.post('/', controller.createOrder);

module.exports = router;