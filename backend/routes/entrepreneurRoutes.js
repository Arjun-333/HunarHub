const express = require('express');
const router = express.Router();
const {
    getEntrepreneurById,
    updateEntrepreneurProfile,
    getEntrepreneurs,
} = require('../controllers/entrepreneurController');
const { protect, entrepreneur } = require('../middleware/authMiddleware');

router.route('/').get(getEntrepreneurs);
router.route('/profile').put(protect, entrepreneur, updateEntrepreneurProfile);
router.route('/:id').get(getEntrepreneurById);

module.exports = router;
