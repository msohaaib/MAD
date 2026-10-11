const mongoose = require('mongoose');

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'];

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: 'Category must be Starters, Mains, Desserts, or Drinks',
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: '🍽️',
    },
    allergens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

menuItemSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('MenuItem', menuItemSchema);
