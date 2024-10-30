// src/components/Authenticate.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { UserContext } from '../context/UserContext';
import { saveUserData } from '../services/localStorageService';

const Authenticate = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = formData;

        if (isLogin) {
            if (!email || !password) {
                setError('Email and password are required.');
                return;
            }
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                setUser(storedUser);
                navigate(`/${storedUser.id}/places`); // Navigate to user places
            } else {
                setError('Invalid email or password.');
            }
        } else {
            if (!username || !email || !password) {
                setError('All fields are required.');
                return;
            }
            const newUser = { id: Date.now().toString(), username, email, password };
            saveUserData(newUser);
            setUser(newUser);
            navigate(`/${newUser.id}/places`); // Navigate to user places
        }
    };

    return (
        <div className="authenticate">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </p>
            </form>
        </div>
    );
};

export default Authenticate;
