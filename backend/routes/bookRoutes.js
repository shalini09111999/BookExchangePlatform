// routes/bookRoutes.js
const express = require('express');
const { addBook, editBook, deleteBook, getUserBooks, searchBooks, getAllBooks } = require('../controllers/bookController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth, addBook);
router.put('/edit/:id', auth, editBook);
router.delete('/delete/:id', auth, deleteBook);
router.get('/user', auth, getUserBooks);
router.get('/search', searchBooks);
router.get('/all',getAllBooks );


module.exports = router;
