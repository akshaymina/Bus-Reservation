const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const { auth, admin } = require('../middleware/auth');

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('bus')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get all bookings (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .populate('bus')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Create new booking
router.post('/', auth, async (req, res) => {
  try {
    const { busId, seatNumber, passengerName, passengerEmail, passengerPhone, paymentMethod } = req.body;

    // Check if bus exists and is available
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    if (!bus.isAvailable()) {
      return res.status(400).json({ message: 'Bus is not available' });
    }

    // Check if seat is available
    const existingBooking = await Booking.findOne({
      bus: busId,
      seatNumber,
      bookingStatus: 'confirmed'
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      bus: busId,
      seatNumber,
      passengerName,
      passengerEmail,
      passengerPhone,
      price: bus.price,
      paymentMethod
    });

    await booking.save();

    // Update bus available seats
    bus.availableSeats -= 1;
    await bus.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Cancel booking
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!booking.isActive()) {
      return res.status(400).json({ message: 'Booking cannot be cancelled' });
    }

    await booking.cancel();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', auth, admin, async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
});

module.exports = router; 