const express = require("express");
const router = express.Router();
const menuItems = require("../data/menu");

// GET all menu
router.get("/", (req, res) => {
  res.json(menuItems);
});

// GET by category
router.get("/category/:category", (req, res) => {
  const category = req.params.category;

  const filtered = menuItems.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );

  res.json(filtered);
});

module.exports = router;
