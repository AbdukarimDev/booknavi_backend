const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    },
    coverImage: {
        type: String,
    },
    category: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: false
    },
    rating: {
        type: Number, 
        default: 0,
        min: 0,
        max: 5
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    ratings: [
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        value: { type: Number, min: 1, max: 5 }
    }
],

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;