const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const auth = require('../middleware/auth.middleware');

// Public routes
router.get('/', controller.getCategories);
// Protected routes

router.post('/', auth, controller.createCategory);
router.put('/:id', auth, controller.updateCategory);
router.delete('/:id', auth, controller.deleteCategory);

module.exports = router;