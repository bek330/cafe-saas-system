const service = require('../services/menu.service');

exports.getByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const items = await service.getByCategory(categoryId);

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const item = await service.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await service.update(id, req.body);

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.toggleAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await service.toggleAvailability(id);

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const items = await service.getAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.remove(id);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};