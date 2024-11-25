// Import required modules
const express = require('express'); // Express framework for building web applications
const router = express.Router(); // Create a new router instance
const db = require('../config/db'); // Import database configuration
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Add JWT library

// POST login route for admin authentication
router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // SQL query to find the admin by username
    const query = 'SELECT * FROM admins WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).send({ success: false }); // Error on query execution

        if (results.length > 0) {
            const admin = results[0]; // Get the first admin result

            // Check if the password matches (no hashing since you want to use plain text passwords)
            if (admin.password === password) {
                return res.status(200).send({ success: true });
            }
        }

        return res.status(401).send({ success: false }); // Unauthorized if login fails
    });
});



// POST signup route to register a new user
router.post('/signup', async (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Basic validation for username length
    if (username.length < 5 || username.length > 15) {
        return res.status(400).json({ message: 'Username must be 5-15 characters long' });
    }
    // Basic validation for password requirements
    if (password.length < 7 || password.length > 20 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        return res.status(400).json({ message: 'Password must be 7-20 characters long, contain one uppercase letter and one number' });
    }

    try {
        // Hash the password using bcrypt with a salt rounds of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert the new user into the database
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                // Log the error and send a 500 response if insertion fails
                console.error(err);
                return res.status(500).send({ message: 'Registration failed' });
            }

            // Send a success response when user is registered successfully
            res.status(201).send({ message: 'User registered successfully' });
        });
    } catch (error) {
        // Log any errors that occur during password hashing
        console.error('Hashing error:', error);
        // Send a 500 response if an error occurs during registration
        res.status(500).send({ message: 'An error occurred during registration' });
    }
});

// POST login route for user authentication
router.post('/login', async (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // SQL query to find the user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).send({ success: false }); // Send a 500 response on error

        // Check if user exists
        if (results.length > 0) {
            const user = results[0]; // Get the first user result
            // Compare the provided password with the hashed password in the database
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Send a success response if passwords match
                return res.status(200).send({ success: true });
            }
        }
        // Send an unauthorized response if login fails
        return res.status(401).send({ success: false });
    });
});



// Export the router to be used in other parts of the application
module.exports = router;
