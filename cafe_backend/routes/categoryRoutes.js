const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

// GET all categories
router.get("/", getCategories);

// POST new category
router.post("/", createCategory);

module.exports = router;