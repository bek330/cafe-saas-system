const service = require('../services/category.service');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await service.getAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, icon } = req.body;
    const category = await service.create(name, icon);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const hasItems = await service.hasMenuItems(id);

    if (hasItems) {
      const error = new Error('Cannot delete category with existing menu items');
      error.statusCode = 400;
      throw error;
    }

    await service.delete(id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await service.update(id, req.body);

    res.json(category);
  } catch (err) {
    next(err);
  }
};