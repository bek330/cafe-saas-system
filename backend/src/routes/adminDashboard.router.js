const express = require("express");
const router = express.Router();

const pool = require("../config/db");

router.get("/summary", async (req, res) => {
  try {
    // Basic stats
    const totalOrdersQuery = await pool.query("SELECT COUNT(*) FROM orders");
    const pendingOrdersQuery = await pool.query("SELECT COUNT(*) FROM orders WHERE status = 'pending'");
    const completedOrdersQuery = await pool.query("SELECT COUNT(*) FROM orders WHERE status = 'completed'");
    const revenueQuery = await pool.query(`
        SELECT COALESCE(SUM(total), 0) AS revenue
        FROM orders
        WHERE status = 'completed'
      `);
    const activeItemsQuery = await pool.query(`
        SELECT COUNT(*)
        FROM menu_items
        WHERE is_available = true
      `);

    // Revenue for the last 7 days (time-series)
    const dailyRevenueQuery = await pool.query(`
      SELECT 
        TO_CHAR(date_series.day, 'Mon DD') as date,
        COALESCE(SUM(o.total), 0) as amount
      FROM (
        SELECT generate_series(
          CURRENT_DATE - INTERVAL '6 days', 
          CURRENT_DATE, 
          '1 day'::interval
        ) as day
      ) date_series
      LEFT JOIN orders o ON DATE(o.created_at) = DATE(date_series.day) AND o.status = 'completed'
      GROUP BY date_series.day
      ORDER BY date_series.day ASC
    `);

    // Sales by Category
    const categorySalesQuery = await pool.query(`
      SELECT 
        c.name as category,
        SUM(oi.quantity * oi.price) as value
      FROM categories c
      JOIN menu_items mi ON c.id = mi.category_id
      JOIN order_items oi ON mi.id = oi.menu_item_id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'completed'
      GROUP BY c.name
      ORDER BY value DESC
    `);

    res.json({
      totalOrders: Number(totalOrdersQuery.rows[0].count),
      pendingOrders: Number(pendingOrdersQuery.rows[0].count),
      completedOrders: Number(completedOrdersQuery.rows[0].count),
      revenue: Number(revenueQuery.rows[0].revenue),
      activeItems: Number(activeItemsQuery.rows[0].count),
      dailyRevenue: dailyRevenueQuery.rows,
      categorySales: categorySalesQuery.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to load dashboard summary",
    });
  }
});

module.exports = router;