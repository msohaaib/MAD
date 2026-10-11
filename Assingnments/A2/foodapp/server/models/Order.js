const mongoose = require('mongoose');

const STATUSES = ['Pending', 'Preparing', 'Ready', 'Served', 'Cancelled'];

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'An order must contain at least one item',
      },
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative'],
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'Pending',
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

orderSchema.statics.STATUSES = STATUSES;
orderSchema.statics.FORWARD = {
  Pending: ['Preparing', 'Cancelled'],
  Preparing: ['Ready'],
  Ready: ['Served'],
  Served: [],
  Cancelled: [],
};

module.exports = mongoose.model('Order', orderSchema);
