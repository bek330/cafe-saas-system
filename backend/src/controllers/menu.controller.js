const service = require('../services/menu.service');

exports.getByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const items = await service.getByCategory(categoryId);

        res.json(items);
    } catch (err) {
        next(err);
    }
};

exports.createItem = async (req, res, next) => {
    try {
        const item = await service.create(req.body);
        
        res.status(201).json(item);
    } catch (err) {
        next(err);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;

        const item = await service.update(id, req.body);

        res.json(item);
    } catch (err) {
        next(err);
    }
};

exports.toggleAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;

        const item = await service.toggleAvailability(id);

        res.json(item);
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const items = await service.getAll();
        res.json(items);
    } catch (err) {
        next(err);
    }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await service.remove(id);

    res.json(result);
  } catch (err) {
    next(err);
  }
};