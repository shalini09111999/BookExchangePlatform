// pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to Your Dashboard</h1>
            
            <div className="dashboard-links">
                <Link to="/books">My Books</Link> {/* Links to BookListing component */}
                <Link to="/books/add">Add a New Book</Link> {/* Links to AddBookForm component */}
                <Link to="/books/search">Search Books</Link>
                <Link to="/create-exchange">Create Exchange Request</Link>
                <Link to="/accept-exchange">Accept Exchange Request</Link>

            </div>
        </div>
    );
};

export default Dashboard;

