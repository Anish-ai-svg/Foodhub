const Food = require('../models/Food');

// GET /api/foods  (supports ?search= and ?category=)
const getAllFoods = async (req, res) => {
  try {
    const query = { isAvailable: true };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    // Admins can also see unavailable items
    if (req.user && req.user.role === 'admin') {
      delete query.isAvailable;
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/foods/:id
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// POST /api/foods  (admin)
const createFood = async (req, res) => {
  try {
    const { name, description, category, price, image, isAvailable } = req.body;

    if (!name || !description || !category || !price || !image) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const food = await Food.create({ name, description, category, price, image, isAvailable });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/foods/:id  (admin)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(food);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/foods/:id  (admin)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllFoods, getFoodById, createFood, updateFood, deleteFood };
