const asyncHandler = require('express-async-handler');
const ServiceRequest = require('../models/ServiceRequest');

// @desc    Create a service request
// @route   POST /api/service-requests
// @access  Private/Customer
const createServiceRequest = asyncHandler(async (req, res) => {
    const { entrepreneurId, serviceType, description } = req.body;

    const serviceRequest = new ServiceRequest({
        customer: req.user._id,
        entrepreneur: entrepreneurId,
        serviceType,
        description,
    });

    const createdRequest = await serviceRequest.save();
    res.status(201).json(createdRequest);
});

// @desc    Get logged in user service requests
// @route   GET /api/service-requests/my
// @access  Private
const getMyServiceRequests = asyncHandler(async (req, res) => {
    let requests;
    if (req.user.role === 'customer') {
        requests = await ServiceRequest.find({ customer: req.user._id }).populate('entrepreneur', 'businessName');
    } else if (req.user.role === 'entrepreneur') {
        // Find requests where the entrepreneur field matches the user's entrepreneur profile
        // This is a bit tricky since we stored entrepreneur ID in the request, but req.user is the User ID.
        // We need to find the Entrepreneur profile for this user first, or we should have stored User ID in entrepreneur field.
        // In my model, entrepreneur field is ref to Entrepreneur model.
        // So I need to find the Entrepreneur document for this User.
        const Entrepreneur = require('../models/Entrepreneur');
        const entrepreneurProfile = await Entrepreneur.findOne({ user: req.user._id });
        
        if (entrepreneurProfile) {
             requests = await ServiceRequest.find({ entrepreneur: entrepreneurProfile._id }).populate('customer', 'name');
        } else {
            requests = [];
        }
    } else {
        requests = [];
    }
    res.json(requests);
});

// @desc    Update service request status
// @route   PUT /api/service-requests/:id
// @access  Private/Entrepreneur
const updateServiceRequestStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (serviceRequest) {
        // Verify ownership
        const Entrepreneur = require('../models/Entrepreneur');
        const entrepreneurProfile = await Entrepreneur.findOne({ user: req.user._id });

        if (!entrepreneurProfile || serviceRequest.entrepreneur.toString() !== entrepreneurProfile._id.toString()) {
             res.status(401);
             throw new Error('Not authorized to update this request');
        }

        serviceRequest.status = status;
        const updatedRequest = await serviceRequest.save();
        res.json(updatedRequest);
    } else {
        res.status(404);
        throw new Error('Service request not found');
    }
});

module.exports = { createServiceRequest, getMyServiceRequests, updateServiceRequestStatus };
