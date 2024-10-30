// src/hooks/useAuth.js
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { saveUserData, removeUserData } from '../services/localStorageService'; // Import storage functions

const useAuth = () => {
    const { user, setUser } = useContext(UserContext); // Access user context

    // Login function
    const login = (userData) => {
        setUser(userData); // Set user in context
        saveUserData(userData); // Save user data in local storage
    };

    // Logout function
    const logout = () => {
        setUser(null); // Clear user from context
        removeUserData(); // Remove user data from local storage
    };

    return { user, login, logout }; // Return user info and auth functions
};

export default useAuth;
