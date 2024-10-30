// src/routes/PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// Custom PrivateRoute component to protect routes
const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useContext(UserContext); // Get user info from context

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/authenticate" />} // Redirect if user is not authenticated
        />
    );
};

export default PrivateRoute;
