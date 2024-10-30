// src/components/EditPlace.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { UserContext } from '../context/UserContext';
import { getPlaces, savePlaces } from '../services/localStorageService';

const EditPlace = () => {
    const { user } = useContext(UserContext);
    const { pid } = useParams();
    const navigate = useNavigate(); // Use useNavigate
    const [placeData, setPlaceData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const places = getPlaces();
        const place = places.find((p) => p.id === pid);
        if (place) {
            setPlaceData(place);
        } else {
            setError('Place not found.');
        }
    }, [pid]);

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

        const updatedPlace = {
            ...placeData,
            uid: user.id
        };

        const places = getPlaces();
        const updatedPlaces = places.map((p) => (p.id === pid ? updatedPlace : p));
        savePlaces(updatedPlaces);

        navigate(`/${user.id}/places`); // Navigate to the user's places list
    };

    if (!placeData) {
        return <div>{error}</div>;
    }

    return (
        <div className="edit-place">
            <h2>Edit Place</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Input fields here */}
                <button type="submit">Update Place</button>
            </form>
        </div>
    );
};

export default EditPlace;
