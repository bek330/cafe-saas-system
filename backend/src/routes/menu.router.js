const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu.controller');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// Public routes
router.get('/category/:categoryId',  controller.getByCategory);
router.get('/', controller.getAll);

// Authenticated routes
router.post('/', verifyToken, requireRole('admin'), controller.createItem);
router.put('/:id', verifyToken, requireRole('admin'), controller.updateItem);
router.put('/toggle/:id', verifyToken, requireRole('admin'), controller.toggleAvailability);

module.exports = router;