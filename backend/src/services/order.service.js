const db = require('../config/db');

exports.createOrder = async (table_number, items) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // 1. Create order
    const orderResult = await client.query(
      `INSERT INTO orders (table_number)
       VALUES ($1)
       RETURNING id`,
      [table_number || null]
    );

    const orderId = orderResult.rows[0].id;

    let total = 0; // ✅ IMPORTANT

    // 2. Insert items
    for (const item of items) {
      const result = await client.query(
        "SELECT price FROM menu_items WHERE id = $1",
        [item.menu_item_id]
      );

      if (result.rows.length === 0) {
        throw new Error(`Item not found: ${item.menu_item_id}`);
      }

      const price = Number(result.rows[0].price);
      const itemTotal = price * item.quantity;

      total += itemTotal; // ✅ accumulate total

      await client.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.menu_item_id, item.quantity, price]
      );
    }

    await client.query(
      `
       UPDATE orders
       SET total = $1
       WHERE id = $2
      `,
      [total, orderId]
    );

    await client.query('COMMIT'); 

    return {
      orderId,
      total,
    };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.getOrders = async () => {
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
      AND o.created_at < NOW() - INTERVAL '30 minutes'
    )
    GROUP BY o.id, o.table_number, o.status, o.created_at
    ORDER BY o.created_at DESC;
  `);
  return result.rows;
};

exports.updateStatus = async (id, status) => {
  const current = await db.query(
    `SELECT status FROM orders WHERE id = $1`,
    [id]
  );

  if (current.rows.length === 0) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = current.rows[0].status;

  const validTransitions = {
    pending: ["accepted", "cancelled"],
    accepted: ["completed", "cancelled"],
    completed: [],
    cancelled: []
  };

  if (!validTransitions[currentStatus].includes(status)) {
    const error = new Error(`Invalid status change from ${currentStatus} to ${status}`);
    error.statusCode = 400;
    throw error;
  }

  await db.query(
    `UPDATE orders SET status = $1 WHERE id = $2`,
    [status, id]
  );

  return { message: "Order status updated" };
};

exports.getOrderHistory = async ({ range, status, search, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  let conditions = [];
  let params = [];

  if (range === "today") {
    conditions.push("DATE(o.created_at) = CURRENT_DATE");
  }

  if (status && status !== "all") {
    params.push(status);
    conditions.push(`o.status = $${params.length}`);
  }

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(
      CAST(o.id AS TEXT) ILIKE $${params.length}
      OR CAST(o.table_number AS TEXT) ILIKE $${params.length}
    )`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countResult = await db.query(`
    SELECT COUNT(*) 
    FROM orders o
    ${whereClause}
  `, params);

  const total = parseInt(countResult.rows[0].count);

  const dataResult = await db.query(`
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
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `, [...params, limit, offset]);

  return {
    data: dataResult.rows,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};