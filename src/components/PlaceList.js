// src/components/PlaceList.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getPlaces, savePlaces } from '../services/localStorageService'; // Import functions to manage places

const PlaceList = () => {
    const { uid } = useParams(); // Get user ID from the URL
    const { user } = useContext(UserContext); // Get user info from context
    const [places, setPlaces] = useState([]); // State to store the list of places

    // Load places for the specific user
    useEffect(() => {
        const storedPlaces = getPlaces(); // Get places from local storage
        const userPlaces = storedPlaces.filter((place) => place.uid === uid); // Filter places for the specified user
        setPlaces(userPlaces); // Update state with user's places
    }, [uid]);

    // Handle deleting a place
    const handleDelete = (id) => {
        const updatedPlaces = places.filter((place) => place.id !== id); // Remove the deleted place from the list
        savePlaces(updatedPlaces); // Save the updated list back to local storage
        setPlaces(updatedPlaces); // Update the state
    };

    return (
        <div className="place-list">
            <h2>Your Places</h2>
            {places.length > 0 ? (
                <ul>
                    {places.map((place) => (
                        <li key={place.id}>
                            <h3>{place.title}</h3>
                            <p>{place.description}</p>
                            <p>Address: {place.address}</p>
                            <p>Location: {place.location}</p>
                            <img src={place.image} alt={place.title} style={{ width: '200px' }} />
                            <div>
                                <Link to={`/places/${place.id}`}>Edit Place</Link>
                                <button onClick={() => handleDelete(place.id)}>Delete Place</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No places found. Please add some!</p>
            )}
            <div>
                <Link to="/places/new">Add a New Place</Link>
            </div>
        </div>
    );
};

export default PlaceList;
