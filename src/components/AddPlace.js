// src/components/AddPlace.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { UserContext } from '../context/UserContext';
import { savePlace } from '../services/localStorageService';

const AddPlace = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate
    const [placeData, setPlaceData] = useState({
        title: '',
        description: '',
        address: '',
        location: '',
        image: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaceData({
            ...placeData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, address, location, image } = placeData;

        if (!title || !description || !address || !location || !image) {
            setError('All fields are required.');
            return;
        }

        const newPlace = {
            id: Date.now().toString(),
            uid: user.id,
            ...placeData
        };

        savePlace(newPlace);
        navigate(`/${user.id}/places`); // Navigate to the user's places list
    };

    return (
        <div className="add-place">
            <h2>Add New Place</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Input fields here */}
                <button type="submit">Add Place</button>
            </form>
        </div>
    );
};

export default AddPlace;
