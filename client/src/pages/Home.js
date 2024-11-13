// client/src/pages/Home.js
import React from 'react';
import bookExchangeImage from './assets/book-exchange.png';
import './HomePage.css'; // Make sure to create this CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <div className="text-overlay">
                <h1>Welcome to the Book Exchange Platform</h1>
                <p>Discover, exchange, and share books with fellow book lovers!</p>
            </div>
            <img src={bookExchangeImage} alt="People exchanging books" className="centered-image" />
        </div>
    );
};

export default Home;
