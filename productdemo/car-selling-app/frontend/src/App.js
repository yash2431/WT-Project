// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './components/CarList';
import EditCar from './components/EditCar'; // Create this component if needed
import CarHistory from './components/CarHistory'; // Create this component if needed
import AddCar from './components/AddCar';

const App = () => {
    return (
      <>
      <AddCar/>
        <Router>
            <Routes>
                <Route path="/" element={<CarList />} />
                <Route path="/edit/:id" element={<EditCar />} />
                <Route path="/history/:id" element={<CarHistory />} />
            </Routes>
        </Router>
      </>
    );
};

export default App;
