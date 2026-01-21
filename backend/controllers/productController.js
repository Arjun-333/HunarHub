const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// @returns {Array} List of products with entrepreneur details
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('entrepreneur', 'businessName');
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('entrepreneur', 'businessName');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Entrepreneur
const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, stock, images } = req.body;

    const product = new Product({
        entrepreneur: req.user._id, // Assuming user is linked to entrepreneur logic or we fetch entrepreneur ID
        title,
        description,
        price,
        category,
        stock,
        images,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Entrepreneur
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        if (product.entrepreneur.toString() !== req.user._id.toString()) {
             res.status(401);
             throw new Error('Not authorized to delete this product');
        }
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = { getProducts, getProductById, createProduct, deleteProduct };
