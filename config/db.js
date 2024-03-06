const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Get MongoDB URL from environment variables
const mongoURL = process.env.MONGOURL;

// Connect to MongoDB
mongoose.connect(mongoURL, {});

// Get MongoDB connection
const db = mongoose.connection;

// Define event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

module.exports = db;
