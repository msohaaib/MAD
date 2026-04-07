const express = require("express");
const router = express.Router();
const users = require("../data/users");

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  users.push({
    id: users.length + 1,
    email,
    password,
  });

  res.json({ message: "User registered" });
});

module.exports = router;
