// routes/exchangeRoutes.js
const express = require('express');
const { createExchangeRequest, updateExchangeRequestStatus, getUserExchangeRequests,acceptExchangeRequest,getPendingExchangeRequests } = require('../controllers/exchangeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/request', auth, createExchangeRequest);
router.put('/update/:id', auth, updateExchangeRequestStatus);
router.get('/user-requests', auth, getUserExchangeRequests);
router.put('/request/:id/accept', auth, acceptExchangeRequest);
router.get('/requests', auth, getPendingExchangeRequests);

module.exports = router;
