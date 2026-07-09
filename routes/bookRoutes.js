const express = require('express'); // avval import
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();   // keyin ishlatish
const upload = require('../middleware/upload');
const { getAllBooks, createBook, getBookById, updateBook, deleteBook, rateBook } = require('../controllers/bookController');
router.get('/books', getAllBooks);
router.post('/books', protect, isAdmin,createBook);
router.get('/books/:id', getBookById);
router.put('/books/:id',protect, isAdmin, updateBook);
router.post('/books/upload', protect, isAdmin, upload.single('image'), (req, res) => {
    console.log(req.file)
    res.json({ url: req.file.path});
});
router.post('/books/:id/rate', protect, rateBook);
router.delete('/books/:id',protect, isAdmin, deleteBook)
module.exports = router;
