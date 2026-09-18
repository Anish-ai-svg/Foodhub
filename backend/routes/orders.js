const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect); // All order routes require auth

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', adminOnly, updateOrderStatus);

module.exports = router;
