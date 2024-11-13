// models/ExchangeRequest.js
const mongoose = require('mongoose');

const ExchangeRequestSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    bookTitle: { type: String, required: true },
    terms: {
        deliveryMethod: { type: String, required: true },
        duration: { type: Number, required: true }
    },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'modified'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('ExchangeRequest', ExchangeRequestSchema);
