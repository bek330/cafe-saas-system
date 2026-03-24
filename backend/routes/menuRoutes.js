const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
} = require("../controllers/menuController");

router.post("/", createMenuItem);
router.get("/", getMenuItems);

module.exports = router;