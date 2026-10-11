const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'Table number is required'],
    unique: true,
    min: [1, 'Table number must be at least 1'],
  },
  seats: {
    type: Number,
    required: [true, 'Seat count is required'],
    min: [1, 'A table must have at least one seat'],
  },
  location: {
    type: String,
    enum: ['Indoor', 'Window', 'Patio'],
    default: 'Indoor',
  },
});

module.exports = mongoose.model('Table', tableSchema);
