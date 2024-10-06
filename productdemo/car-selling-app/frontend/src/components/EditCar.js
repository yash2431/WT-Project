// src/components/EditCar.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        description: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`http://localhost:2004/api/cars/${id}/history`);
                setCar(response.data);
            } catch (err) {
                setError("Failed to fetch car data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:2004/api/cars/${id}`, car);
            navigate('/'); // Redirect to the car list after editing
        } catch (err) {
            setError("Failed to update car. Please try again.");
        }
    };

    if (loading) return <div>Loading...</div>; // Loading feedback
    if (error) return <div>{error}</div>; // Error feedback

    return (
        <div className="edit-car">
            <h2>Edit Car</h2>
            <form onSubmit={handleSubmit}>
                <input name="make" value={car.make} onChange={handleChange} placeholder="Make" required />
                <input name="model" value={car.model} onChange={handleChange} placeholder="Model" required />
                <input name="year" type="number" value={car.year} onChange={handleChange} placeholder="Year" required />
                <input name="price" type="number" value={car.price} onChange={handleChange} placeholder="Price" required />
                <input name="description" value={car.description} onChange={handleChange} placeholder="Description" required />
                <input name="imageUrl" value={car.imageUrl} onChange={handleChange} placeholder="Image URL" required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditCar;
