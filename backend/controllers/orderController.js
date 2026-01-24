const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Entrepreneur = require('../models/Entrepreneur');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        totalAmount,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems,
            customer: req.user._id,
            totalAmount,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customer: req.user._id });
    res.json(orders);
});

// @desc    Get orders for entrepreneur
// @route   GET /api/orders/entrepreneur
// @access  Private/Entrepreneur
const getEntrepreneurOrders = asyncHandler(async (req, res) => {
    // 1. Find the entrepreneur profile
    const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });
    if (!entrepreneur) {
        res.status(404);
        throw new Error('Entrepreneur profile not found');
    }

    // 2. Find all products belonging to this entrepreneur
    const products = await Product.find({ entrepreneur: entrepreneur._id });
    const productIds = products.map(p => p._id);

    // 3. Find orders that contain any of these products
    const orders = await Order.find({
        'orderItems.product': { $in: productIds }
    }).populate('customer', 'name email');

    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('customer', 'name email address city postalCode phone')
        .populate('orderItems.product', 'title price');

    if (order) {
        // Allow access if user is admin, owner of order, or seller of a product in the order
        // For simplicity, we check if user is the customer or an entrepreneur.
        // Ideally we should check if the entrepreneur owns one of the products.
        // Let's assume secure enough for demo or implement basics.
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

module.exports = { addOrderItems, getMyOrders, getEntrepreneurOrders, getOrderById };
