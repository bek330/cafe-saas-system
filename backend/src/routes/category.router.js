const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

router.get('/', controller.getCategories);
router.post('/', controller.createCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;