const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
connectDB();


const app = express();
app.use(cors());
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
