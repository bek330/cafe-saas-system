const express = require("express");
const router = express.Router();

const pool = require("../config/db");

router.get("/summary", async (req, res) => {
  try {
    const { range = '7' } = req.query; // Default to 7 days
    const days = parseInt(range);

    // Current period stats
    const statsQuery = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_orders,
        COALESCE(SUM(total) FILTER (WHERE status = 'completed'), 0) as revenue
      FROM orders
      WHERE created_at >= CURRENT_DATE - (INTERVAL '1 day' * $1)
    `, [days]);

    // Previous period stats (for growth)
    const prevStatsQuery = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total) FILTER (WHERE status = 'completed'), 0) as revenue
      FROM orders
      WHERE created_at >= CURRENT_DATE - (INTERVAL '1 day' * $1)
        AND created_at < CURRENT_DATE - (INTERVAL '1 day' * $2)
    `, [days * 2, days]);

    const activeItemsQuery = await pool.query(`
        SELECT COUNT(*)
        FROM menu_items
        WHERE is_available = true
      `);

    // Time-series revenue
    const dailyRevenueQuery = await pool.query(`
      SELECT 
        TO_CHAR(date_series.day, 'Mon DD') as date,
        COALESCE(SUM(o.total), 0) as amount
      FROM (
        SELECT generate_series(
          CURRENT_DATE - (INTERVAL '1 day' * $1) + INTERVAL '1 day', 
          CURRENT_DATE, 
          '1 day'::interval
        ) as day
      ) date_series
      LEFT JOIN orders o ON DATE(o.created_at) = DATE(date_series.day) AND o.status = 'completed'
      GROUP BY date_series.day
      ORDER BY date_series.day ASC
    `, [days]);

    // Sales by Category
    const categorySalesQuery = await pool.query(`
      SELECT 
        c.name as category,
        SUM(oi.quantity * oi.price) as value
      FROM categories c
      JOIN menu_items mi ON c.id = mi.category_id
      JOIN order_items oi ON mi.id = oi.menu_item_id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'completed' AND o.created_at >= CURRENT_DATE - (INTERVAL '1 day' * $1)
      GROUP BY c.name
      ORDER BY value DESC
    `, [days]);

    // Top Selling Items
    const topItemsQuery = await pool.query(`
      SELECT 
        mi.name,
        SUM(oi.quantity) as sold,
        SUM(oi.quantity * oi.price) as revenue
      FROM menu_items mi
      JOIN order_items oi ON mi.id = oi.menu_item_id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'completed' AND o.created_at >= CURRENT_DATE - (INTERVAL '1 day' * $1)
      GROUP BY mi.id, mi.name
      ORDER BY sold DESC
      LIMIT 5
    `, [days]);

    // Peak Hours
    const peakHoursQuery = await pool.query(`
      SELECT 
        EXTRACT(HOUR FROM created_at) as hour,
        COUNT(*) as count
      FROM orders
      WHERE created_at >= CURRENT_DATE - (INTERVAL '1 day' * $1)
      GROUP BY hour
      ORDER BY hour ASC
    `, [days]);

    const current = statsQuery.rows[0];
    const prev = prevStatsQuery.rows[0];

    const calculateGrowth = (curr, prev) => {
      curr = Number(curr);
      prev = Number(prev);
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Math.round(((curr - prev) / prev) * 100);
    };

    res.json({
      totalOrders: Number(current.total_orders),
      orderGrowth: calculateGrowth(current.total_orders, prev.total_orders),
      pendingOrders: Number(current.pending_orders),
      completedOrders: Number(current.completed_orders),
      revenue: Number(current.revenue),
      revenueGrowth: calculateGrowth(current.revenue, prev.revenue),
      activeItems: Number(activeItemsQuery.rows[0].count),
      dailyRevenue: dailyRevenueQuery.rows,
      categorySales: categorySalesQuery.rows,
      topItems: topItemsQuery.rows,
      peakHours: peakHoursQuery.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to load dashboard summary",
    });
  }
});

module.exports = router;