// src/pages/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';


const ResetPassword = () => {
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
                resetToken,
                newPassword,
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || "Password reset failed.");
            setMessage('');
        }
    };

    return (
        <div className="reset-password-form">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div>
                    <input
                        type="text"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                        placeholder="Reset Token"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ResetPassword;
