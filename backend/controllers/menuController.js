const pool = require("../config/db");

// CREATE MENU ITEM
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category_id, image_url } = req.body;

    // Basic validation
    if (!name || !price || !category_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO menu_items 
       (name, description, price, category_id, image_url) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [name, description, price, category_id, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    // Foreign key error handling
    if (err.code === "23503") {
      return res.status(400).json({ error: "Invalid category_id" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

// GET ALL MENU ITEMS (with category name)
const getMenuItems = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        menu_items.*, 
        categories.name AS category_name
       FROM menu_items
       JOIN categories ON menu_items.category_id = categories.id
       ORDER BY menu_items.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
};