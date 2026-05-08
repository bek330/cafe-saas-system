const orderService = require('../services/order.service');

// CREATE ORDER
exports.createOrder = async (req, res, next) => {
  try {
    const { table_number, items } = req.body;
    const result = await orderService.createOrder(table_number, items);
    res.status(201).json(result);
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
    const { status } = req.body;
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
