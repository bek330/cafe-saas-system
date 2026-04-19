const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// Public routes
router.get('/', controller.getCategories);
// Protected routes

router.post('/', verifyToken, requireRole('admin'), controller.createCategory);
router.put('/:id', verifyToken, requireRole('admin'), controller.updateCategory);
router.delete('/:id', verifyToken, requireRole('admin'), controller.deleteCategory);

module.exports = router;