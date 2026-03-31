const express = require("express");
const router = express.Router();
const pool = require("../config/db");

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

// GET all categories
router.get("/", getCategories);

// POST new category
router.post("/", createCategory);
// DELETE category
router.put("/disable/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE menu_items SET is_available = false WHERE id = $1",
      [id]
    );

    res.json({ message: "Item disabled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to disable item" });
  }
});

module.exports = router;