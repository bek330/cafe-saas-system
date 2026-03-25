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
    categories.id AS category_id,
    categories.name AS category_name,
    menu_items.id,
    menu_items.name,
    menu_items.description,
    menu_items.price,
    menu_items.image_url
  FROM categories
  LEFT JOIN menu_items 
  ON categories.id = menu_items.category_id 
  AND menu_items.is_available = true
  ORDER BY categories.name`
);

    const data = {};

    for (let row of result.rows) {
      if (!data[row.category_id]) {
        data[row.category_id] = {
          category: row.category_name,
          items: [],
        };
      }

      if (row.id) {
        data[row.category_id].items.push({
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          image_url: row.image_url,
        });
      }
    }

    res.json(Object.values(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE menu_items 
       SET is_available = NOT is_available 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
  toggleAvailability,
};