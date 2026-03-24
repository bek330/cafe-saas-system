const pool = require("../config/db");

// CREATE ORDER
const createOrder = async (req, res) => {
  const { table_number, items } = req.body;

  if (!table_number || !items || items.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Create order
    const orderResult = await client.query(
      "INSERT INTO orders (table_number) VALUES ($1) RETURNING *",
      [table_number]
    );

    const order = orderResult.rows[0];

    // 2. Insert order items
    for (let item of items) {
      const { menu_item_id, quantity } = item;

      // Get current price from menu_items
      const menuItem = await client.query(
        "SELECT price FROM menu_items WHERE id = $1",
        [menu_item_id]
      );

      if (menuItem.rows.length === 0) {
        throw new Error("Menu item not found");
      }

      const price = menuItem.rows[0].price;

      await client.query(
        `INSERT INTO order_items 
        (order_id, menu_item_id, quantity, price)
        VALUES ($1, $2, $3, $4)`,
        [order.id, menu_item_id, quantity, price]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order created",
      order_id: order.id,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);

    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// GET ALL ORDERS WITH ITEMS
const getOrders = async (req, res) => {
  try {
    const ordersResult = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    const orders = ordersResult.rows;

    for (let order of orders) {
      const itemsResult = await pool.query(
        `SELECT 
          order_items.quantity,
          order_items.price,
          menu_items.name
         FROM order_items
         JOIN menu_items 
         ON order_items.menu_item_id = menu_items.id
         WHERE order_items.order_id = $1`,
        [order.id]
      );

      order.items = itemsResult.rows;

      // Calculate total
      order.total = order.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};