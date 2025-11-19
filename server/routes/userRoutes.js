const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Create a new user
router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  db.query(
    'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, firstName, lastName, email });
    }
  );
});

module.exports = router;