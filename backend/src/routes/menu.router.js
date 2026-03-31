const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu.controller');

router.get('/category/:categoryId', controller.getByCategory);
router.post('/', controller.createItem);
router.put('/:id', controller.updateItem);
router.put('/disable/:id', controller.disableItem);

module.exports = router;