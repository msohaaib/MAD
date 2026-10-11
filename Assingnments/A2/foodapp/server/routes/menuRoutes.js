const express = require('express');
const {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { protect, managerOnly } = require('../middleware/auth');
const { validateId } = require('../middleware/validateId');

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', validateId, getMenuItem);
router.post('/', protect, managerOnly, createMenuItem);
router.put('/:id', protect, managerOnly, validateId, updateMenuItem);
router.delete('/:id', protect, managerOnly, validateId, deleteMenuItem);

module.exports = router;
