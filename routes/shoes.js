const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all shoes
router.get('/shoes', (req, res) => {
    const query = 'SELECT * FROM shoes';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to retrieve shoes' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;