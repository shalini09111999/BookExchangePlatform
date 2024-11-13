import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExchangeRequests = () => {
    const [exchangeRequests, setExchangeRequests] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                const response = await axios.get('http://localhost:5000/api/exchanges/user-requests', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setExchangeRequests(response.data);
            } catch (error) {
                console.error('Error fetching exchange requests', error);
            }
        };
        fetchRequests();
    }, []);

    const handleUpdate = async (requestId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            await axios.put(
                `http://localhost:5000/api/exchanges/update/${requestId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            setExchangeRequests((prev) =>
                prev.map((req) => (req._id === requestId ? { ...req, status } : req))
            );
        } catch (error) {
            console.error('Error updating request', error);
        }
    };

    return (
        <div>
            <h2>Exchange Requests</h2>
            <ul>
                {exchangeRequests.map((req) => (
                    <li key={req._id}>
                        <p>Book: {req.bookTitle}</p>
                        <p>Sender: {req.sender.name}</p>
                        <p>Recipient: {req.recipient?.name || 'Not assigned yet'}</p>
                        <p>Status: {req.status}</p>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="modified">Modified</option>
                        </select>
                        <button onClick={() => handleUpdate(req._id)}>Update Status</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExchangeRequests;
