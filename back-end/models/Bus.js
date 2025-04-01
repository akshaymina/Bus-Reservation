const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
    trim: true
  },
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    trim: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String,
    enum: ['WiFi', 'AC', 'USB', 'Reclining Seats', 'Blanket', 'Water Bottle']
  }],
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Virtual for duration
busSchema.virtual('duration').get(function() {
  return this.arrivalTime - this.departureTime;
});

// Method to check if bus is available
busSchema.methods.isAvailable = function() {
  return this.status === 'active' && this.availableSeats > 0;
};

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus; 