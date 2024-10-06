const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const History = require('../models/History'); // Ensure this model is defined
const { body, validationResult } = require('express-validator');
const cors = require('cors');
router.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend


// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch car history
router.get('/:id/history', async (req, res) => {
    try {
        const carHistory = await History.find({ carId: req.params.id });
        res.json(carHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new car
router.post('/add', [
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isNumeric().withMessage('Year must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('imageUrl').notEmpty().withMessage('ImageURL is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const car = new Car(req.body);
    try {
        const savedCar = await car.save();
        // Optionally log to history
        // const historyEntry = new History({ carId: savedCar._id, action: 'Added', description: `Car added: ${savedCar.make} ${savedCar.model}` });
        // await historyEntry.save();
        res.status(201).json(savedCar);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Update car details
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a car
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // Optionally log to history
        // const historyEntry = new History({ carId: req.params.id, action: 'Deleted', description: `Car deleted: ${deletedCar.make} ${deletedCar.model}` });
        // await historyEntry.save();
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
