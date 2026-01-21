const asyncHandler = require('express-async-handler');
const Entrepreneur = require('../models/Entrepreneur');

// @desc    Get entrepreneur profile by user ID (public)
// @route   GET /api/entrepreneurs/:id
// @access  Public
const getEntrepreneurById = asyncHandler(async (req, res) => {
    // This expects the Entrepreneur ID, not User ID
    const entrepreneur = await Entrepreneur.findById(req.params.id).populate('user', 'name email avatar');

    if (entrepreneur) {
        res.json(entrepreneur);
    } else {
        res.status(404);
        throw new Error('Entrepreneur not found');
    }
});

// @desc    Update entrepreneur profile
// @route   PUT /api/entrepreneurs/profile
// @access  Private/Entrepreneur
const updateEntrepreneurProfile = asyncHandler(async (req, res) => {
    const entrepreneur = await Entrepreneur.findOne({ user: req.user._id });

    if (entrepreneur) {
        entrepreneur.businessName = req.body.businessName || entrepreneur.businessName;
        entrepreneur.description = req.body.description || entrepreneur.description;
        entrepreneur.location = req.body.location || entrepreneur.location;
        entrepreneur.skills = req.body.skills || entrepreneur.skills;

        const updatedEntrepreneur = await entrepreneur.save();
        res.json(updatedEntrepreneur);
    } else {
        res.status(404);
        throw new Error('Entrepreneur profile not found');
    }
});

// @desc    Get all entrepreneurs
// @route   GET /api/entrepreneurs
// @access  Public
const getEntrepreneurs = asyncHandler(async (req, res) => {
    const entrepreneurs = await Entrepreneur.find({}).populate('user', 'name avatar');
    res.json(entrepreneurs);
});

module.exports = { getEntrepreneurById, updateEntrepreneurProfile, getEntrepreneurs };
