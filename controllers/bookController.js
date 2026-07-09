const Book = require('../models/Book')
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message: error.message });
    }
}
const createBook = async (req,res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
    return res.status(404).json({message: 'Kitob topilmadi'});
}
res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
}

const updateBook = async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate(id, req.body, { returnDocument: 'after '});
        if (!book) {
            return res.status(404).json({ message: 'Kitob topilmadi '});
        } res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: error.message });
    }
}

const rateBook = async (req, res) => {
    try {
        const { value } = req.body;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Kitob topilmadi' });
        }

        // Bu foydalanuvchi oldin baholaganmi?
        const existing = book.ratings.find(r => r.user.toString() === req.user.id);
        if (existing) {
            existing.value = value;  // eski bahoni yangilaydi
        } else {
            book.ratings.push({ user: req.user.id, value });
        }

        // O'rtacha reytingni hisoblash
        const sum = book.ratings.reduce((acc, r) => acc + r.value, 0);
        book.rating = (sum / book.ratings.length).toFixed(1);

        await book.save();
        res.status(200).json({ rating: book.rating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBook = async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).json({message: 'Kitob topilmadi'});

        } res.status(200).json({message: "Kitob o'chirildi"})
    } catch (error) {
        res.status(500).json({message: error.message });

    }
}
module.exports = { getAllBooks, createBook, getBookById, updateBook, deleteBook, rateBook };
