// controllers/exchangeController.js

const ExchangeRequest = require('../models/ExchangeRequest');
const Book = require('../models/Book');
const User = require('../models/User');

// Create exchange request
exports.createExchangeRequest = async (req, res) => {
    try {
        const { bookTitle, terms } = req.body;
        const senderId = req.user && req.user._id;

        if (!senderId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const exchangeRequest = new ExchangeRequest({
            sender: senderId,
            bookTitle,
            terms,
            status: 'pending'
        });

        await exchangeRequest.save();
        res.status(201).json({ message: 'Exchange request created successfully', exchangeRequest });
    } catch (error) {
        console.error('Error creating exchange request:', error);
        res.status(500).json({ message: 'Error creating exchange request', error });
    }
};


// controllers/exchangeController.js
exports.acceptExchangeRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const recipientId = req.user._id;

        const exchangeRequest = await ExchangeRequest.findById(requestId);
        if (!exchangeRequest) {
            return res.status(404).json({ message: 'Exchange request not found' });
        }

        if (exchangeRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Exchange request already accepted or closed' });
        }

        exchangeRequest.recipient = recipientId;
        exchangeRequest.status = 'accepted';

        await exchangeRequest.save();
        res.status(200).json({ message: 'Exchange request accepted', exchangeRequest });
    } catch (error) {
        console.error(error); // log error for debugging
        res.status(500).json({ message: 'Error accepting exchange request', error });
    }
};


// Update exchange request status
exports.updateExchangeRequestStatus = async (req, res) => {
    try {
        const { status, terms } = req.body;
        const requestId = req.params.id;

        const exchangeRequest = await ExchangeRequest.findById(requestId);
        if (!exchangeRequest) return res.status(404).json({ message: 'Exchange request not found' });

        if (status) exchangeRequest.status = status;
        if (terms) exchangeRequest.terms = terms;

        await exchangeRequest.save();
        res.status(200).json({ message: 'Exchange request updated successfully', exchangeRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating exchange request', error });
    }
};

// Get exchange requests for the logged-in user
exports.getUserExchangeRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        const exchangeRequests = await ExchangeRequest.find({
            $or: [{ sender: userId }, { recipient: userId }]
        })
        .populate('sender', 'name')
        .populate('recipient', 'name')
        .exec();

        res.status(200).json(exchangeRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exchange requests', error });
    }
};


// Get all exchange requests from other users
exports.getPendingExchangeRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        const exchangeRequests = await ExchangeRequest.find({
            sender: { $ne: userId },
            status: 'pending'
        })
        .populate('sender', 'name')
        .exec();

        res.status(200).json(exchangeRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending exchange requests', error });
    }
};

