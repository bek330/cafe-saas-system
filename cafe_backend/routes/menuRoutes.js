const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const {
  createMenuItem,
  getMenuItems,
  toggleAvailability,
} = require("../controllers/menuController");

router.post("/", createMenuItem);
router.get("/", getMenuItems);
router.put("/:id/toggle", toggleAvailability);
router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
  "SELECT * FROM menu_items WHERE category_id = $1 AND is_available = true",
  [id]
);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM menu_items ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});
router.put("/:id/disable", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE menu_items SET is_available = false WHERE id = $1",
      [id]
    );

    res.json({ message: "Item disabled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update item" });
  }
});
router.put("/:id/enable", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE menu_items SET is_available = true WHERE id = $1",
      [id]
    );

    res.json({ message: "Item enabled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

module.exports = router;