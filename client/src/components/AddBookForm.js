import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState(true);
    const [message, setMessage] = useState(''); // State to hold success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, user might not be logged in.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/books/add', 
            { title, author, genre, condition, availability },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Book added successfully!'); // Set success message
            setTitle('');
            setAuthor('');
            setGenre('');
            setCondition('');
        } catch (error) {
            console.error('Error adding book', error);
            setMessage('Error adding book. Please try again.'); // Set error message if the request fails
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title" 
                    required 
                    style={{ padding: '5px', fontSize: '1rem' }}
                />
                <input 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="Author" 
                    required 
                    style={{ padding: '5px', fontSize: '1rem' }}
                />
                <input 
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)} 
                    placeholder="Genre" 
                    required 
                    style={{ padding: '5px', fontSize: '1rem' }}
                />
                <input 
                    value={condition} 
                    onChange={(e) => setCondition(e.target.value)} 
                    placeholder="Condition" 
                    required 
                    style={{ padding: '5px', fontSize: '1rem' }}
                />
                <select 
                    value={availability} 
                    onChange={(e) => setAvailability(e.target.value === 'true')}
                    style={{ padding: '5px', fontSize: '1rem' }}
                >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                </select>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                        type="submit" 
                        style={{
                            padding: '5px 15px',
                            fontSize: '0.8rem',
                            backgroundColor: '#007bff', 
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: 'auto'
                        }}
                    >
                        Add Book
                    </button>
                </div>
            </form>
            {message && (
                <p style={{ textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddBookForm;
