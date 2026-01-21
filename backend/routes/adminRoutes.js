const express = require('express');
const router = express.Router();
const {
    getUnverifiedEntrepreneurs,
    verifyEntrepreneur,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/verifications').get(protect, admin, getUnverifiedEntrepreneurs);
router.route('/verify/:id').put(protect, admin, verifyEntrepreneur);

module.exports = router;
