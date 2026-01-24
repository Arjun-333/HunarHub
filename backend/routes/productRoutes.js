const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getMyProducts,
} = require('../controllers/productController');
const { protect, entrepreneur } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, entrepreneur, createProduct);
router.route('/myproducts').get(protect, entrepreneur, getMyProducts);
router.route('/:id').get(getProductById).put(protect, entrepreneur, updateProduct).delete(protect, entrepreneur, deleteProduct);

module.exports = router;
