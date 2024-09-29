const bcrypt = require('bcrypt');
const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // replace with your MySQL password
    database: 'shoe_store'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected...');
});

// Seed admin user
const seedAdmin = async () => {
    const username = 'admin';
    const password = 'admin'; // Plaintext password
    const role = 'admin';

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the admin user into the database
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [username, hashedPassword, role], (err, results) => {
            if (err) {
                console.error('Insert error:', err);
                return;
            }
            console.log('Admin user seeded successfully');
        });
    } catch (error) {
        console.error('Hashing error:', error);
    } finally {
        // Close the database connection
        db.end();
    }
};

seedAdmin();
