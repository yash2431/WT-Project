const express = require('express');
const connectDB = require('./config/db');
const carRoutes = require('./routes/car');
const cors = require('cors');
const morgan = require('morgan'); // For logging
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/cars', carRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

