const MenuItem = require('../models/MenuItem');

async function getMenu(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

async function getMenuItem(req, res, next) {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function createMenuItem(req, res, next) {
  try {
    const { name, description, price, category, available, image, allergens } = req.body;

    if (!name || price === undefined || price === null || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    if (Number(price) < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      available,
      image,
      allergens,
    });

    return res.status(201).json(item);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
}

async function updateMenuItem(req, res, next) {
  try {
    const { name, description, price, category, available, image, allergens } = req.body;

    if (price !== undefined && Number(price) < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, available, image, allergens },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    return res.status(200).json(item);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
}

async function deleteMenuItem(req, res, next) {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    return res.status(200).json({ message: 'Menu item deleted', id: item._id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
