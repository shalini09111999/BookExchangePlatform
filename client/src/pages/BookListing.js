import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookListing.css';

const BookListing = () => {
    const [books, setBooks] = useState([]);
    const [editBook, setEditBook] = useState(null); // To store the book being edited
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '',
        availability: true
    });

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found, user might not be logged in.');

            const response = await axios.get('http://localhost:5000/api/books/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, user might not be logged in.');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/books/delete/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(books.filter((book) => book._id !== bookId));
        } catch (error) {
            console.error('Error deleting book', error);
        }
    };

    const handleEditClick = (book) => {
        setEditBook(book._id);
        setFormData({
            title: book.title,
            author: book.author,
            genre: book.genre,
            condition: book.condition,
            availability: book.availability
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "availability" ? value === "true" : value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, user might not be logged in.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/books/edit/${editBook}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(books.map((book) => (book._id === editBook ? response.data.book : book)));
            setEditBook(null); // Close the edit form
        } catch (error) {
            console.error('Error updating book', error);
        }
    };

    return (
        <div>
            <h2 className="centered-heading">My Books</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {books.map((book) => (
                    <li key={book._id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                        {editBook === book._id ? (
                            // Edit form for the book
                            <form onSubmit={handleEditSubmit} style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleEditChange}
                                    placeholder="Title"
                                    required
                                />
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleEditChange}
                                    placeholder="Author"
                                    required
                                />
                                <input
                                    type="text"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleEditChange}
                                    placeholder="Genre"
                                    required
                                />
                                <input
                                    type="text"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleEditChange}
                                    placeholder="Condition"
                                    required
                                />
                                <select
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleEditChange}
                                >
                                    <option value={true}>Available</option>
                                    <option value={false}>Not Available</option>
                                </select>
                                <button type="submit"
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
                                 }}>Save</button>
                                <button type="button" onClick={() => setEditBook(null)}
                                    style={{
                                        padding: '5px 15px',
                                        fontSize: '0.8rem',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'inline-block', // Makes button fit its content
                                        width: 'auto' // Prevents button from stretching
                                    }}>Cancel</button>
                            </form>
                        ) : (
                            // Display book details
                            <div style={{ flex: 1 }}>
                                <strong>{book.title}</strong> by {book.author} <br />
                                Genre: {book.genre} <br />
                                Condition: {book.condition} <br />
                                Availability: {book.availability ? "Available" : "Not Available"}
                            </div>
                        )}
                        <div>
                            <button
                                onClick={() => handleEditClick(book)}
                                style={{
                                    padding: '5px 10px',
                                    fontSize: '0.8rem',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    marginBottom:'5px'
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(book._id)}
                                style={{
                                    padding: '5px 10px',
                                    fontSize: '0.8rem',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookListing;
