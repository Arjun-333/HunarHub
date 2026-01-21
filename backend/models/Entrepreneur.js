const mongoose = require('mongoose');

const entrepreneurSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: [{
        type: String,
    }],
    location: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;
