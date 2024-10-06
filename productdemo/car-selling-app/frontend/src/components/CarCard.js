// src/components/CarCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car, onDelete }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleEdit = () => {
        navigate(`/edit/${car._id}`);
    };

    const handleViewHistory = () => {
        navigate(`/history/${car._id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            await onDelete(car._id);
        }
    };

    return (
        <div className="car-card">
            {loading && <p>Loading...</p>} {/* Loading state */}
            <img 
                src={car.imageUrl} 
                alt={`${car.make} ${car.model}`} 
                className="car-image" 
                onLoad={() => setLoading(false)} 
                style={{ display: loading ? 'none' : 'block' }} // Hide image until loaded
            />
            <h2>{car.make} {car.model}</h2>
            <p>Year: {car.year}</p>
            <p>Price: ${car.price}</p>
            <p>{car.description}</p>
            <div className="button-group">
                <button onClick={handleViewHistory} aria-label={`View history of ${car.make} ${car.model}`}>View History</button>
                <button onClick={handleEdit} aria-label={`Edit ${car.make} ${car.model}`}>Edit</button>
                <button onClick={handleDelete} aria-label={`Delete ${car.make} ${car.model}`}>Delete</button>
            </div>
        </div>
    );
};

export default CarCard;
