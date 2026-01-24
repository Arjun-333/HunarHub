const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Entrepreneur = require('../models/Entrepreneur');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// @returns {Array} List of products with entrepreneur details
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('entrepreneur', 'businessName user');
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('entrepreneur', 'businessName user');

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

    const entrepreneurProfile = await Entrepreneur.findOne({ user: req.user._id });

    if (!entrepreneurProfile) {
        res.status(404);
        throw new Error('Entrepreneur profile not found');
    }

    const product = new Product({
        entrepreneur: entrepreneurProfile._id,
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
    const entrepreneurProfile = await Entrepreneur.findOne({ user: req.user._id });

    if (product) {
        if (!entrepreneurProfile || product.entrepreneur.toString() !== entrepreneurProfile._id.toString()) {
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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Entrepreneur
const updateProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, stock, images } = req.body;

    const product = await Product.findById(req.params.id);
    const entrepreneurProfile = await Entrepreneur.findOne({ user: req.user._id });

    if (product) {
        // Check if entrepreneur profile exists and matches product owner
        if (!entrepreneurProfile || product.entrepreneur.toString() !== entrepreneurProfile._id.toString()) {
             res.status(401);
             throw new Error('Not authorized to update this product');
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.images = images || product.images;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get logged in entrepreneur's products
// @route   GET /api/products/myproducts
// @access  Private/Entrepreneur
const getMyProducts = asyncHandler(async (req, res) => {
    const entrepreneurProfile = await Entrepreneur.findOne({ user: req.user._id });

    if (entrepreneurProfile) {
        const products = await Product.find({ entrepreneur: entrepreneurProfile._id });
        res.json(products);
    } else {
        res.status(404);
        throw new Error('Entrepreneur profile not found');
    }
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getMyProducts };
