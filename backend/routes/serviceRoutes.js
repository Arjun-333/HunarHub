const express = require('express');
const router = express.Router();
const {
    createServiceRequest,
    getMyServiceRequests,
    updateServiceRequestStatus,
} = require('../controllers/serviceController');
const { protect, entrepreneur } = require('../middleware/authMiddleware');

router.route('/').post(protect, createServiceRequest);
router.route('/my').get(protect, getMyServiceRequests);
router.route('/:id').put(protect, entrepreneur, updateServiceRequestStatus);

module.exports = router;
