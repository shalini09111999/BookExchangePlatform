// src/components/AllBooksList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBooksList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all books on component mount
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/all');
                setBooks(response.data.books);
            } catch (err) {
                setError('Failed to load books');
                console.error("Error fetching books:", err);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>All Books</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <strong>Title:</strong> {book.title} <br />
                        <strong>Author:</strong> {book.author} <br />
                        <strong>Genre:</strong> {book.genre} <br />
                        <strong>Condition:</strong> {book.condition} <br />
                        <strong>Availability:</strong> {book.availability ? 'Available' : 'Not Available'} <br />
                        <strong>Listed by:</strong> {book.user?.name || 'Unknown User'}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllBooksList;
