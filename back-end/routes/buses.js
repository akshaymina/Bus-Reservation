const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const { auth, admin } = require('../middleware/auth');

// Get all buses with optional filters
router.get('/', async (req, res) => {
  try {
    const { from, to, date, minPrice, maxPrice } = req.query;
    let query = {};

    // Apply filters
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.departureTime = { $gte: startDate, $lte: endDate };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const buses = await Bus.find(query).sort({ departureTime: 1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buses', error: error.message });
  }
});

// Get single bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bus', error: error.message });
  }
});

// Create new bus (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error creating bus', error: error.message });
  }
});

// Update bus (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bus', error: error.message });
  }
});

// Delete bus (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bus', error: error.message });
  }
});

module.exports = router; 