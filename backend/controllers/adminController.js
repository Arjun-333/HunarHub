const asyncHandler = require('express-async-handler');
const Entrepreneur = require('../models/Entrepreneur');

// @desc    Get all unverified entrepreneurs
// @route   GET /api/admin/verifications
// @access  Private/Admin
const getUnverifiedEntrepreneurs = asyncHandler(async (req, res) => {
    const entrepreneurs = await Entrepreneur.find({ isVerified: false }).populate('user', 'name email');
    res.json(entrepreneurs);
});

// @desc    Verify an entrepreneur
// @route   PUT /api/admin/verify/:id
// @access  Private/Admin
const verifyEntrepreneur = asyncHandler(async (req, res) => {
    const entrepreneur = await Entrepreneur.findById(req.params.id);

    if (entrepreneur) {
        entrepreneur.isVerified = true;
        const updatedEntrepreneur = await entrepreneur.save();
        res.json(updatedEntrepreneur);
    } else {
        res.status(404);
        throw new Error('Entrepreneur not found');
    }
});

module.exports = { getUnverifiedEntrepreneurs, verifyEntrepreneur };
