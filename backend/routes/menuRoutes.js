const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
  toggleAvailability,
} = require("../controllers/menuController");

router.post("/", createMenuItem);
router.get("/", getMenuItems);
router.put("/:id/toggle", toggleAvailability);

module.exports = router;