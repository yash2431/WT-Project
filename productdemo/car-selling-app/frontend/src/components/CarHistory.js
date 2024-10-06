// src/components/CarHistory.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarHistory.css';

const CarHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:2004/api/cars/${id}/history`);
                setHistory(response.data);
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchHistory();
    }, [id]);

    if (loading) return <div>Loading...</div>; // Loading indicator
    if (error) return <div>Error: {error}</div>; // Error message

    return (
        <div className="history-modal">
            <h2>Car History</h2>
            <button className="close-button" onClick={() => navigate('/')}>Close</button>
            <div className="history-list">
                {history.map((item) => (
                    <div className="history-item" key={item._id}> {/* Use unique key */}
                        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                        <p><strong>Make:</strong> {item.action}</p>
                        <p><strong>Model:</strong> {item.action}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarHistory;
