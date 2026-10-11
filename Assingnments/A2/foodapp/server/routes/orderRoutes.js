const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, managerOnly } = require('../middleware/auth');
const { validateId } = require('../middleware/validateId');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, managerOnly, getAllOrders);
router.patch('/:id/status', protect, managerOnly, validateId, updateOrderStatus);

module.exports = router;
