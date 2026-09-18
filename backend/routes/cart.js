const express = require('express');
const router = express.Router();
const { getCart, addItem, updateItem, removeItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect); // All cart routes require auth

router.get('/', getCart);
router.post('/items', addItem);
router.patch('/items/:foodId', updateItem);
router.delete('/items/:foodId', removeItem);
router.delete('/', clearCart);

module.exports = router;
