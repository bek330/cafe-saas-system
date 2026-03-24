const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
} = require("../controllers/menuController");

router.post("/", createMenuItem);
router.get("/", getMenuItems);
router.put("/:id/availability", toggleAvailability);

module.exports = router;