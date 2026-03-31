const db = require('../config/db');

exports.createOrder = async (table_number, items) => {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        // 1. Create order
        const orderResult = await client.query(
            `INSERT INTO orders (table_number)
       VALUES ($1)
       RETURNING *`,
            [table_number]
        );

        const order = orderResult.rows[0];

        // 2. Insert order items
        for (const item of items) {
            // Get price from DB (NOT frontend)
            const menuItem = await client.query(
                `SELECT price, is_available FROM menu_items WHERE id = $1`,
                [item.menu_item_id]
            );

            if (menuItem.rows.length === 0) {
                throw new Error(`Menu item ${item.menu_item_id} not found`);
            }

            if (!menuItem.rows[0].is_available) {
                throw new Error(`Menu item ${item.menu_item_id} is not available`);
            }

            const price = menuItem.rows[0].price;

            await client.query(
                `INSERT INTO order_items 
         (order_id, menu_item_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
                [order.id, item.menu_item_id, item.quantity, price]
            );
        }

        await client.query('COMMIT');

        return order;

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};