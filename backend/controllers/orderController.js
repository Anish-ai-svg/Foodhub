const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Food = require('../models/Food');

// POST /api/orders  — place order (backend calculates price)
const placeOrder = async (req, res) => {
  try {
    const { deliveryAddress } = req.body;

    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    const { name, phone, address, city, state, pincode } = deliveryAddress;
    if (!name || !phone || !address || !city || !state || !pincode) {
      return res.status(400).json({ message: 'Please fill all delivery address fields' });
    }

    // Fetch user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.food');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Build order items from DB prices (never trust frontend prices)
    const orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const food = await Food.findById(item.food._id);
      if (!food || !food.isAvailable) {
        return res.status(400).json({ message: `${item.food.name} is no longer available` });
      }
      const lineTotal = food.price * item.quantity;
      subtotal += lineTotal;
      orderItems.push({
        food: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
      });
    }

    const deliveryFee = 40;
    const total = subtotal + deliveryFee;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress,
      paymentMethod: 'cod',
      status: 'pending',
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders  — current user's orders (admin sees all)
const getOrders = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Customers can only see their own orders
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/orders/:id/status  (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getOrders, getOrderById, updateOrderStatus };
