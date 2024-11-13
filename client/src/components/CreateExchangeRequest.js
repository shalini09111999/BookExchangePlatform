// components/CreateExchangeRequest.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateExchangeRequest = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [terms, setTerms] = useState({ deliveryMethod: '', duration: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found, user might not be logged in.');

            const response = await axios.post(
                'http://localhost:5000/api/exchanges/request',
                { bookTitle, terms },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            setMessage('Exchange request created successfully!');
            console.log('Exchange request response:', response.data);
        } catch (error) {
            console.error('Error creating exchange request', error);
            setMessage('Error creating exchange request');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Delivery Method"
                    value={terms.deliveryMethod}
                    onChange={(e) => setTerms({ ...terms, deliveryMethod: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (days)"
                    value={terms.duration}
                    onChange={(e) => setTerms({ ...terms, duration: e.target.value })}
                    required
                />
                <button type="submit">Send Exchange Request</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateExchangeRequest;
