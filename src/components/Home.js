// src/components/Home.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getPlaces } from '../services/localStorageService'; // Import function to get places

const Home = () => {
    const { user } = useContext(UserContext); // Get user info from context
    const [places, setPlaces] = useState([]); // State to store the list of places

    // Load places for the logged-in user
    useEffect(() => {
        const storedPlaces = getPlaces(); // Get places from local storage
        const userPlaces = storedPlaces.filter((place) => place.uid === user.id); // Filter places for the logged-in user
        setPlaces(userPlaces); // Update state with user's places
    }, [user]);

    return (
        <div className="home">
            <h1>Welcome, {user.username}!</h1>
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

export default Home;
