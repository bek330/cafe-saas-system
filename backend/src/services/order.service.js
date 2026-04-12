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

    await client.query('COMMIT');

    return {
      orderId,
      total, // ✅ send to frontend
    };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};