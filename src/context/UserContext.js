// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a UserContext
export const UserContext = createContext();

// UserProvider component to wrap around your app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold user information

    // Load user data from local storage when the app initializes
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser); // Set user state if there's data in local storage
        }
    }, []);

    // Return the UserContext provider
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
