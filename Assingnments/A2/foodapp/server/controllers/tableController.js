const Table = require('../models/Table');

async function getTables(req, res, next) {
  try {
    const tables = await Table.find().sort({ number: 1 });
    return res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
}

module.exports = { getTables };
