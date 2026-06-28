const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders } = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/orders', protect, createOrder);           // login qilgan → buyurtma yaratish
router.get('/orders/my', protect, getMyOrders);         // login qilgan → o'z buyurtmalari
router.get('/orders', protect, isAdmin, getAllOrders);   // faqat admin → barcha buyurtmalar

module.exports = router;