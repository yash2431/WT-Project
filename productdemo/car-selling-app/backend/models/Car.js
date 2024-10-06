const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: { type: String, required: true, index: true },
    model: { type: String, required: true, index: true },
    year: { 
        type: Number, 
        required: true, 
        validate: {
            validator: function(value) {
                return value >= 1886 && value <= new Date().getFullYear(); // Valid year range
            },
            message: props => `${props.value} is not a valid year!`
        }
    },
    price: { 
        type: Number, 
        required: true, 
        min: [0, 'Price must be a positive number'] // Price must be positive
    },
    description: { type: String },
    imageUrl: { type: String },
});

// Creating the Car model
module.exports = mongoose.model('Car', CarSchema); 
