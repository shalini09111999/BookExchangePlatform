// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000; // Default port


// Middleware

app.use(express.json()); // To parse JSON request bodies
const userRouter = require('./routes/userRoutes');

  const corsOptions = {
    origin: 'http://localhost:3000', // Specify the frontend URL
    credentials: true,               // Enable credentials
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Exchange Platform API');
});

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/exchanges', require('./routes/exchangeRoutes'));


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


