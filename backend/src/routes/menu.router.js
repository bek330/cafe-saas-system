const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu.controller');
const auth = require('../middleware/auth.middleware');

// Public routes
router.get('/category/:categoryId',  controller.getByCategory);
router.get('/', controller.getAll);

// Authenticated routes
router.post('/', auth, controller.createItem);
router.put('/:id', auth, controller.updateItem);
router.put('/toggle/:id', auth, controller.toggleAvailability);

module.exports = router;