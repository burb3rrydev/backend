// Import necessary modules
const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)
const dotenv = require('dotenv'); // Module to load environment variables from a .env file
const db = require('./config/db'); // Database configuration file
const authRoutes = require('./routes/auth'); // Routes for authentication-related endpoints
const shoesRoute = require('./routes/shoes'); // Routes for shoe-related endpoints
const checkoutRoutes = require('./routes/checkout'); // Routes for checkout-related endpoints

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express(); // Move this before route usage

// Use middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Define API routes after 'app' initialization
app.use('/api', authRoutes); // Mount authentication routes on the /api path
app.use('/api', shoesRoute);  // Mount shoes routes on the /api path
app.use('/api', checkoutRoutes); // Mount checkout routes on the /api path

// Start the server
const PORT = process.env.PORT || 5000; // Use the PORT from environment variables or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log a message to indicate the server is running
});
