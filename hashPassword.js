const bcrypt = require('bcrypt');

const password = 'admin'; // Password to hash

// Hash the password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed password:', hash); // Log the hashed password
});
