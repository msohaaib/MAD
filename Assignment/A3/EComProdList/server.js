const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// 👇 IMPORTANT: serve static images
app.use('/images', express.static('images'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shop',
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API route
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // ✅ Convert image path → full URL
    const updated = results.map(item => ({
      ...item,
      image: `http://10.0.2.2:3000${item.image}`,
    }));

    res.json(updated);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
