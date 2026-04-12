const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');

router.post('/', controller.createOrder);
router.get('/', controller.getOrders);
router.put('/:id/status', controller.updateStatus);


module.exports = router;