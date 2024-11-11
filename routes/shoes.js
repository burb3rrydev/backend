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

// Add a new shoe (Admin only)
router.post('/admin/shoes', (req, res) => {
    const { name, image_url, size, brand, category, price } = req.body;
    const query = 'INSERT INTO shoes (name, image_url, size, brand, category, price) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [name, image_url, size, brand, category, price], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to add shoe' });
        res.status(201).json({ message: 'Shoe added successfully' });
    });
});

// Update a shoe (Admin only)
router.put('/admin/shoes/:id', (req, res) => {
    const { id } = req.params;
    const { name, image_url, size, brand, category, price } = req.body;
    const query = 'UPDATE shoes SET name = ?, image_url = ?, size = ?, brand = ?, category = ?, price = ? WHERE id = ?';
    
    db.query(query, [name, image_url, size, brand, category, price, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to update shoe' });
        res.status(200).json({ message: 'Shoe updated successfully' });
    });
});

// Delete a shoe (Admin only)
router.delete('/admin/shoes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM shoes WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to delete shoe' });
        res.status(200).json({ message: 'Shoe deleted successfully' });
    });
});


module.exports = router;