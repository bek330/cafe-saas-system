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
      "SELECT * FROM menu_items WHERE category_id = $1",
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;