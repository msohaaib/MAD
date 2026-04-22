const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'expense_tracker',
});

// Connect
db.connect(err => {
  if (err) console.log(err);
  else console.log('Connected to MySQL');
});

// Get transactions
app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(3000, () => console.log('Server running'));
