const express = require("express");
const router = express.Router();
let orders = require("../data/orders");

// Place order
router.post("/", (req, res) => {
  const order = req.body;

  orders.push(order);

  // ORDER LOGGER (IMPORTANT)
  console.log("📦 New Order Received:");
  console.log(order);

  res.json({ message: "Order received" });
});

module.exports = router;
