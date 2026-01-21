const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, entrepreneur } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, entrepreneur, createProduct);
router.route('/:id').get(getProductById).delete(protect, entrepreneur, deleteProduct);

module.exports = router;
