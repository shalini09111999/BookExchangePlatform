import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetLinkSent, setResetLinkSent] = useState(false); // New state to track if reset link was sent

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage('Password reset link sent to your email.');
            setResetLinkSent(true); // Set this to true to show the reset link
        } /*catch (error) {
            console.error("Error sending reset link", error);
            setMessage('Failed to send reset link. Please try again.');
        }*/
            catch (error) {
                // Check if the error response exists
                const errorMessage = error.response?.data?.message || 'Failed to send reset link. Please try again.';
                console.error("Error sending reset link", error);
                setMessage(errorMessage);
            }
    };

    return (
        <div>
            <h2 style={{textAlign:'center'}}>Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="auth-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
            {resetLinkSent && (
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                
                    <Link to="/reset-password" style={{ fontSize: '16px', color: '#007bff', textDecoration: 'none' }} >Reset Password?
                    </Link>
                    </div>
                
            )}
            
        </div>
    );
};

export default ForgotPassword;
