const service = require('../services/category.service');

exports.getCategories = async (req, res) => {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const category = await service.create(name, icon);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const hasItems = await service.hasMenuItems(id);

    if (hasItems) {
      return res.status(400).json({
        error: 'Cannot delete category with existing menu items',
      });
    }

    await service.delete(id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await service.update(id, req.body);

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};