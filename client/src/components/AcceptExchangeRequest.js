// components/AcceptExchangeRequest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcceptExchangeRequest = () => {
    const [exchangeRequests, setExchangeRequests] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch pending exchange requests from other users
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/exchanges/requests', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setExchangeRequests(response.data);
            } catch (error) {
                console.error('Error fetching exchange requests', error);
            }
        };

        fetchRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/exchanges/request/${requestId}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            setMessage(`Exchange request accepted: ${response.data.exchangeRequest.bookTitle}`);
            setExchangeRequests(exchangeRequests.filter((req) => req._id !== requestId));
        } catch (error) {
            console.error('Error accepting exchange request', error);
            setMessage('Error accepting exchange request');
        }
    };

    return (
        <div>
            <h2>Pending Exchange Requests</h2>
            {message && <p>{message}</p>}
            {exchangeRequests.length > 0 ? (
                <ul>
                    {exchangeRequests.map((request) => (
                        <li key={request._id}>
                            <p><strong>Book Title:</strong> {request.bookTitle}</p>
                            <p><strong>Sender:</strong> {request.sender.name}</p>
                            <button onClick={() => handleAccept(request._id)}>Accept Request</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending exchange requests.</p>
            )}
        </div>
    );
};

export default AcceptExchangeRequest;
