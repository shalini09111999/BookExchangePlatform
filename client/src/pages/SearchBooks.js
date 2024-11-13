import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [message, setMessage] = useState('');
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books/search', {
                params: {
                    title,
                    author,
                    genre,
                    condition,
                },
            });
            setSearchResults(response.data);
            if (response.data.length > 0) {
                setMessage(`Found ${response.data.length} book(s).`);
            } else {
                setMessage('No books found.');
            }
        } catch (error) {
            console.error('Error searching books', error);
            setMessage('Error searching for books. Please try again.');
        }
        };

    return (
        <div>
            <h2>Search Books</h2>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
            />
            <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
            />
            <input
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Condition"
            />
            <button onClick={handleSearch}
            style={{
                                  
                padding: '5px 15px',
                fontSize: '0.8rem',
                backgroundColor: '#007bff', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '5px',
                marginLeft: '5px',
                display: 'inline-block', // Makes button fit its content
                width: 'auto' // Prevents button from stretching
             }}
            >Search</button>
             {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>} {/* Display message */}
            <ul>
                {searchResults.map((book) => (
                    <li key={book._id}>
                        {book.title} by {book.author} (Genre: {book.genre}, Condition: {book.condition})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBooks;
