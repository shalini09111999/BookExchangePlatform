
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [favoriteGenres, setFavoriteGenres] = useState('');  // State for favorite genres
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Split genres by commas and trim whitespace
            const genresArray = favoriteGenres.split(',').map(genre => genre.trim());
            
            await axios.post('http://localhost:5000/api/auth/register', { email, password, name, favoriteGenres: genresArray });
            
            alert("Registration successful!");
            navigate('/login'); // Navigate to the login page
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <form onSubmit={handleRegister} className="auth-form">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="text"
                value={favoriteGenres}
                onChange={(e) => setFavoriteGenres(e.target.value)}
                placeholder="Favorite Genres (comma-separated)"
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
