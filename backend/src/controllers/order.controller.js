const service = require('../services/order.service');
const db = require('../config/db');

exports.createOrder = async (req, res) => {
    try {
        const { table_number, items } = req.body;

        const order = await service.createOrder(table_number, items);

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const result = await db.query(`
      SELECT 
        o.id,
        o.table_number,
        o.status,
        o.created_at,
        SUM(oi.quantity * oi.price) as total_price,
        json_agg(
         json_build_object(
            'menu_item_id', oi.menu_item_id,
            'name', mi.name,
            'image_url', mi.image_url,
            'quantity', oi.quantity,
            'price', oi.price
             )
        ) as items
        FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN menu_items mi ON oi.menu_item_id = mi.id
    GROUP BY o.id
    ORDER BY o.created_at DESC;
    `);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.query(
            `UPDATE orders SET status = $1 WHERE id = $2`,
            [status, id]
        );

        res.json({ message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};