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

    const validRanges = ['today', 'all'];
    const validStatuses = ['pending', 'accepted', 'completed', 'cancelled', 'all'];

    if (range !== undefined && (typeof range !== 'string' || !validRanges.includes(range))) {
      return res.status(400).json({ error: 'Range must be either today or all' });
    }

    if (status !== undefined && (typeof status !== 'string' || !validStatuses.includes(status))) {
      return res.status(400).json({ error: 'Invalid order status filter' });
    }

    if (search !== undefined && (typeof search !== 'string' || search.length > 100)) {
      return res.status(400).json({ error: 'Search must be a string no longer than 100 characters' });
    }

    const normalizedSearch = typeof search === 'string' ? search.trim() : undefined;

    const parsePositiveInteger = (value, defaultValue, maximum = Number.MAX_SAFE_INTEGER) => {
      if (value === undefined) return defaultValue;

      if (typeof value !== 'string' || !/^\d+$/.test(value)) {
        return null;
      }

      const parsed = Number(value);
      if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > maximum) {
        return null;
      }

      return parsed;
    };

    const parsedPage = parsePositiveInteger(page, 1);
    const parsedLimit = parsePositiveInteger(limit, 10, 100);

    if (parsedPage === null || parsedLimit === null) {
      return res.status(400).json({
        error: 'Page must be a positive integer and limit must be a positive integer no greater than 100',
      });
    }

    if (!Number.isSafeInteger((parsedPage - 1) * parsedLimit)) {
      return res.status(400).json({ error: 'Pagination values are too large' });
    }

    const result = await orderService.getOrderHistory({
      range,
      status,
      search: normalizedSearch,
      page: parsedPage,
      limit: parsedLimit,
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};
