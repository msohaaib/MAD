const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ⚠️ put your MySQL password here
  database: 'ecommerce_app',
});

db.connect(err => {
  if (err) {
    console.log('DB Error:', err);
  } else {
    console.log('MySQL Connected');
  }
});

// 📦 API: Get product by ID
app.get('/product/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.send(err);
    res.json(result[0]);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
