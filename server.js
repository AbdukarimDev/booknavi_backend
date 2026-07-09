const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
connectDB();


const app = express();
app.use(cors({
    origin: [
    'https://book-navi-frontend.vercel.app',
        'http://localhost:5173',
        'http://localhost:5174'
        ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: 'Juda ko\'p so\'rov yuborildi, keyinroq urinib ko\'ring'

});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', orderRoutes)
app.get('/', (req,res) => {
    res.send('BookNavi API ishlayapti');
});
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>   {
    console.log(`Server ${PORT} portda ishlayapti`);
});
