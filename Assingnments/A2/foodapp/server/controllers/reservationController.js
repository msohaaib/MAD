const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

async function createReservation(req, res, next) {
  try {
    const { table, date, time, partySize, notes } = req.body;

    if (!table || !date || !time || !partySize) {
      return res.status(400).json({ message: 'Table, date, time, and party size are required' });
    }

    const tableDoc = await Table.findById(table);
    if (!tableDoc) {
      return res.status(404).json({ message: 'Table not found' });
    }

    if (Number(partySize) > tableDoc.seats) {
      return res.status(400).json({
        message: `Table ${tableDoc.number} only seats ${tableDoc.seats}`,
      });
    }

    const clash = await Reservation.findOne({
      table,
      date,
      time,
      status: { $in: ['Pending', 'Accepted'] },
    });

    if (clash) {
      return res.status(409).json({ message: 'Table already booked at that date and time' });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      table,
      date,
      time,
      partySize,
      notes: notes || '',
    });

    const populated = await reservation.populate('table');
    return res.status(201).json(populated);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
}

async function getMyReservations(req, res, next) {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('table')
      .sort({ date: 1, time: 1 });
    return res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
}

async function getAllReservations(req, res, next) {
  try {
    const reservations = await Reservation.find()
      .populate('user', 'name email phone')
      .populate('table')
      .sort({ date: 1, time: 1 });
    return res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
}

async function updateReservation(req, res, next) {
  try {
    const { status } = req.body;
    const allowed = ['Accepted', 'Declined', 'Cancelled'];

    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ message: 'Status must be Accepted, Declined, or Cancelled' });
    }

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = status;
    await reservation.save();
    const populated = await reservation.populate(['user', 'table']);
    return res.status(200).json(populated);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservation,
};
