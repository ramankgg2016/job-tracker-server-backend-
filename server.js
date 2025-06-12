// server/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For Cross-Origin Resource Sharing
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Allow cross-origin requests from your frontend

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // 
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// API Routes 
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));