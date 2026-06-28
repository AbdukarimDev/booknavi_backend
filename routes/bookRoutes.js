const express = require('express'); // avval import
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();   // keyin ishlatish
const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const upload = require('../middleware/upload');
router.get('/books', getAllBooks);
router.post('/books', protect, isAdmin,createBook);
router.get('/books/:id', getBookById);
router.put('/books/:id',protect, isAdmin, updateBook);
router.post('/books/upload', protect, isAdmin, upload.single('image'), (req, res) => {
    console.log(req.file)
    res.json({ url: `http://localhost:5000/uploads/${req.file.filename}` });
});
router.delete('/books/:id',protect, isAdmin, deleteBook)
module.exports = router;
