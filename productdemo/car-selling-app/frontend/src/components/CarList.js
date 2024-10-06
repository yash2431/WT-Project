// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import EditCarModal from './EditCarModal';
import CarHistory from './CarHistory'; 
import './CarList.css';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [historyCarId, setHistoryCarId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:2004/api/cars');
                setCars(response.data);
            } catch (err) {
                setError("Failed to fetch cars. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const handleEdit = (car) => {
        setHistoryCarId(null); // Close history modal when editing
        setSelectedCar(car);
    };

    const handleViewHistory = (carId) => {
        setSelectedCar(null); // Close edit modal when viewing history
        setHistoryCarId(carId);
    };

    const handleDelete = async (carId) => {
        const confirmed = window.confirm("Are you sure you want to delete this car?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:2004/api/cars/${carId}`);
                setCars(prevCars => prevCars.filter(car => car._id !== carId));
            } catch (error) {
                console.error("Error deleting car:", error);
                setError("Failed to delete the car. Please try again.");
            }
        }
    };

    const closeHistory = () => {
        setHistoryCarId(null); // Close history modal
    };

    // Render loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="car-list">
            <h1>Car Listings</h1>
            <div className="car-list-container">
                {cars.map(car => (
                    <CarCard
                        key={car._id}
                        car={car}
                        onEdit={handleEdit}
                        onViewHistory={handleViewHistory}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            {selectedCar && <EditCarModal car={selectedCar} setCar={setSelectedCar} setCars={setCars} />}
            {historyCarId && <CarHistory carId={historyCarId} onClose={closeHistory} />}
        </div>
    );
};

export default CarList;
