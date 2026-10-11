const mongoose = require('mongoose');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

function validateId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  next();
}

module.exports = { isValidObjectId, validateId };
