import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Check if user is logged in

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            {!isAuthenticated && <Link to="/login" className="nav-link">Login</Link>}
            {!isAuthenticated && <Link to="/register" className="nav-link">Register</Link>}
            {isAuthenticated && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
            {isAuthenticated && <Link to="/logout" className="nav-link">Logout</Link>}
            <Link to="/all-books" className="nav-link">All Books</Link>
        </nav>
    );
};

export default Navbar;
