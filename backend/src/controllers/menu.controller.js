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

exports.disableItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await service.disable(id);

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};