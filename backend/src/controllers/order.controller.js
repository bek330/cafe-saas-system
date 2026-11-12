const orderService = require('../services/order.service');

// CREATE ORDER
exports.createOrder = async (req, res, next) => {
  try {
    const { table_number, items } = req.body || {};

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return res.status(400).json({ error: 'An order must contain between 1 and 50 items' });
    }

    const hasInvalidItem = items.some((item) => (
      !item ||
      !Number.isInteger(Number(item.menu_item_id)) ||
      Number(item.menu_item_id) <= 0 ||
      !Number.isInteger(Number(item.quantity)) ||
      Number(item.quantity) <= 0 ||
      Number(item.quantity) > 50
    ));

    if (hasInvalidItem) {
      return res.status(400).json({ error: 'Each order item must have a valid menu item ID and quantity between 1 and 50' });
    }

    const result = await orderService.createOrder(table_number, items);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// GET ALL ORDERS (Today's active)
exports.getOrders = async (req, res, next) => {
  try {
    const result = await orderService.getOrders();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};
    const result = await orderService.updateStatus(id, status);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET ORDER HISTORY
exports.getOrderHistory = async (req, res, next) => {
  try {
    const { range, status, search, page, limit } = req.query;
    const result = await orderService.getOrderHistory({ range, status, search, page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
