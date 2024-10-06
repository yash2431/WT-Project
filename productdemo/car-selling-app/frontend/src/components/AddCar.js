// src/components/AddCar.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
    const [car, setCar] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        description: '',
        imageUrl: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccess(''); // Reset success message

        try {
            // Basic validation
            if (!car.make || !car.model || !car.year || !car.price) {
                setError('Make, Model, Year, and Price are required.');
                return;
            }

            // Post the car data
            await axios.post('http://localhost:2004/api/cars/add', car , {
                headers: {
                    'Content-Type': 'application/json',
                }});
            setSuccess('Car added successfully!');
            // Reset the form
            setCar({
                make: '',
                model: '',
                year: '',
                price: '',
                description: '',
                imageUrl: '',
            });
        } catch (error) {
            setError('Error adding car: ' + error.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#333', color: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h2>Add a New Car</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="make"
                    placeholder="Make"
                    value={car.make}
                    onChange={handleChange}
                    required
                />
                <input
                    name="model"
                    placeholder="Model"
                    value={car.model}
                    onChange={handleChange}
                    required
                />
                <input
                    name="year"
                    placeholder="Year"
                    type="number"
                    value={car.year}
                    onChange={handleChange}
                    required
                />
                <input
                    name="price"
                    placeholder="Price"
                    type="number"
                    value={car.price}
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={car.description}
                    onChange={handleChange}
                />
                <input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={car.imageUrl}
                    onChange={handleChange}
                />
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
};

export default AddCar;
