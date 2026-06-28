const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { items, address, phone } = req.body;
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        const order = new Order({
            user: req.user.id,
            items,
            totalPrice,
            address,
            phone
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createOrder, getMyOrders, getAllOrders };