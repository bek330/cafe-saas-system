const express = require("express");
const router = express.Router();

const pool = require("../config/db");

router.get("/summary", async (req, res) => {
  try {
    const totalOrdersQuery =
      await pool.query(
        "SELECT COUNT(*) FROM orders"
      );

    const pendingOrdersQuery =
      await pool.query(
        "SELECT COUNT(*) FROM orders WHERE status = 'pending'"
      );

    const completedOrdersQuery =
      await pool.query(
        "SELECT COUNT(*) FROM orders WHERE status = 'completed'"
      );

    const revenueQuery =
      await pool.query(`
        SELECT COALESCE(SUM(total), 0) AS revenue
        FROM orders
        WHERE status = 'completed'
      `);

    const activeItemsQuery =
      await pool.query(`
        SELECT COUNT(*)
        FROM menu_items
        WHERE is_available = true
      `);

    res.json({
      totalOrders:
        Number(
          totalOrdersQuery.rows[0].count
        ),

      pendingOrders:
        Number(
          pendingOrdersQuery.rows[0].count
        ),

      completedOrders:
        Number(
          completedOrdersQuery.rows[0].count
        ),

      revenue:
        Number(
          revenueQuery.rows[0].revenue
        ),

      activeItems:
        Number(
          activeItemsQuery.rows[0].count
        ),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to load dashboard summary",
    });
  }
});

module.exports = router;