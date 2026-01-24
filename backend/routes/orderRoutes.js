const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getMyOrders,
    getEntrepreneurOrders,
    getOrderById,
} = require('../controllers/orderController');
const { protect, entrepreneur } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/entrepreneur').get(protect, entrepreneur, getEntrepreneurOrders);
router.route('/:id').get(protect, getOrderById);

module.exports = router;
