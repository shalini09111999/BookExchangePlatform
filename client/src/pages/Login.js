import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/reducers/authReducer';
import axios from 'axios';
import './AuthForm.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store the token
            dispatch(loginSuccess(response.data.user)); // Assuming user data is still needed
            console.log("Login successful");
            navigate('/dashboard');
            // Optionally, redirect the user to another page
            // history.push('/dashboard'); // Or any other route
        } catch (error) {
            console.error("Login failed", error);
            const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}

            <div style={{ marginTop: '10px' }}>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </form>
    );
};

export default Login;


