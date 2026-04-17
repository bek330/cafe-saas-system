const express = require('express');
const router = express.Router();


const controller = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');


router.post('/', controller.createOrder);
router.get('/', auth, controller.getOrders);
router.put('/:id/status', controller.updateStatus);


module.exports = router;