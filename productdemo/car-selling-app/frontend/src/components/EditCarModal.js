// src/components/EditCarModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './EditCarModal.css';

const EditCarModal = ({ car, setCar, setCars }) => {
    const [formData, setFormData] = useState(car);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.put(`http://localhost:2004/api/cars/${car._id}`, formData);
            setCars(prevCars => prevCars.map(c => (c._id === car._id ? formData : c)));
            setCar(null); // Close modal
        } catch (err) {
            setError('Error updating car. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Edit Car</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Make"
                    required
                />
                <input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Model"
                    required
                />
                <input
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Year"
                    required
                />
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
                <button type="button" onClick={() => setCar(null)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditCarModal;
