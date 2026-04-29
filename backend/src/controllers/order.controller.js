const orderService = require('../services/order.service');
const db = require('../config/db');

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { table_number, items } = req.body;

    const result = await orderService.createOrder(table_number, items);

    res.json(result); // { orderId, total }
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        o.id,
        o.table_number,
        o.status,
        o.created_at,
        SUM(oi.quantity * oi.price) as total,
        json_agg(
          json_build_object(
            'menu_item_id', oi.menu_item_id,
            'name', mi.name,
            'image_url', mi.image_url,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) FILTER (WHERE oi.id IS NOT NULL) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE DATE(o.created_at) = CURRENT_DATE -- ✅ ONLY TODAY
      AND NOT (
      o.status = 'completed'
      AND o.created_at < NOW() - INTERVAL '30 minutes')
      GROUP BY o.id, o.table_number, o.status, o.created_at
      ORDER BY o.created_at DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // get current status
    const current = await db.query(
      `SELECT status FROM orders WHERE id = $1`,
      [id]
    );

    const currentStatus = current.rows[0].status;

    // 🚫 prevent invalid transitions
    const validTransitions = {
      pending: ["accepted", "cancelled"],   // ✅ can cancel early
      accepted: ["completed", "cancelled"], // ✅ can cancel mid-way
      completed: [],
      cancelled: []
    };

    if (!validTransitions[currentStatus].includes(status)) {
      return res.status(400).json({
        error: `Invalid status change from ${currentStatus} to ${status}`
      });
    }

    await db.query(
      `UPDATE orders SET status = $1 WHERE id = $2`,
      [status, id]
    );

    res.json({ message: "Order status updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ORDER HISTORY
exports.getOrderHistory = async (req, res) => {
  try {
    const { range, status, search, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let conditions = [];

    // 📅 time filter
    if (range === "today") {
      conditions.push("DATE(o.created_at) = CURRENT_DATE");
    }

    // 📊 status filter
    if (status && status !== "all") {
      conditions.push(`o.status = '${status}'`);
    }

    // 🔍 search (order id OR table number)
    if (search) {
      conditions.push(`(
        CAST(o.id AS TEXT) ILIKE '%${search}%'
        OR CAST(o.table_number AS TEXT) ILIKE '%${search}%'
      )`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // 🧮 total count (for pagination)
    const countResult = await db.query(`
      SELECT COUNT(*) 
      FROM orders o
      ${whereClause}
    `);

    const total = parseInt(countResult.rows[0].count);

    // 📦 actual data
    const result = await db.query(`
      SELECT 
        o.id,
        o.table_number,
        o.status,
        o.created_at,
        SUM(oi.quantity * oi.price) as total,
        json_agg(
          json_build_object(
            'menu_item_id', oi.menu_item_id,
            'name', mi.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) FILTER (WHERE oi.id IS NOT NULL) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menu_items mi ON oi.menu_item_id = mi.id
      ${whereClause}
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    res.json({
      data: result.rows,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};