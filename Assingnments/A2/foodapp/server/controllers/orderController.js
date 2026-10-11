const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

async function placeOrder(req, res, next) {
  try {
    const { items, notes } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item' });
    }

    const builtItems = [];
    let total = 0;

    for (const line of items) {
      if (!line.menuItem || !line.quantity || Number(line.quantity) < 1) {
        return res.status(400).json({ message: 'Each item needs a menuItem id and a quantity of at least 1' });
      }

      const dish = await MenuItem.findById(line.menuItem);
      if (!dish) {
        return res.status(404).json({ message: `Menu item not found: ${line.menuItem}` });
      }

      if (!dish.available) {
        return res.status(400).json({ message: `${dish.name} is currently unavailable` });
      }

      const quantity = Number(line.quantity);
      builtItems.push({
        menuItem: dish._id,
        name: dish.name,
        price: dish.price,
        quantity,
      });
      total += dish.price * quantity;
    }

    // Never use the total sent by the app. A client can change it before the
    // request leaves the phone. The server must price every line from MongoDB.
    const order = await Order.create({
      user: req.user._id,
      items: builtItems,
      total: Math.round(total * 100) / 100,
      notes: notes || '',
    });

    return res.status(201).json(order);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status || !Order.STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Status must be Pending, Preparing, Ready, Served, or Cancelled' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const allowed = Order.FORWARD[order.status] || [];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${order.status} to ${status}`,
      });
    }

    order.status = status;
    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };
