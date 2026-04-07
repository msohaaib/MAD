const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Import routes
const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Use routes
app.use("/api/menu", menuRoutes);
app.use("/api", authRoutes);
app.use("/api/orders", orderRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Restaurant API Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
