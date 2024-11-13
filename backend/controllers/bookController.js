// controllers/bookController.js
const Book = require('../models/Book');

// Add a new book listing
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre, condition,availability, } = req.body;
        const book = await Book.create({
            title,
            author,
            genre,
            condition,
            availability,
            user: req.user._id,
        });
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};

// Edit a book listing
exports.editBook = async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

// Delete a book listing
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

// Get user's books
exports.getUserBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

// Search books based on criteria
exports.searchBooks = async (req, res) => {
    try {
        const { title, author, genre, condition } = req.query;
        const query = {};
        if (title) query.title = { $regex: title, $options: 'i' };
        if (author) query.author = { $regex: author, $options: 'i' };
        if (genre) query.genre = genre;
        if (condition) query.condition = condition;

        const books = await Book.find(query).populate('user', 'name email');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error searching books', error });
    }
};

//get all books

exports.getAllBooks = async (req, res) => {
    try {
        // Fetch all books, including the user details who listed them (if needed)
        const books = await Book.find().populate('user', 'name email'); // Populate 'user' field with 'name' and 'email' fields from the User model
        res.status(200).json({ books });
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: 'Failed to retrieve books' });
    }
};
