const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  seatNumber: {
    type: Number,
    required: true,
    min: 1
  },
  passengerName: {
    type: String,
    required: true,
    trim: true
  },
  passengerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  passengerPhone: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'net_banking']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    required: true,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Method to check if booking is active
bookingSchema.methods.isActive = function() {
  return this.bookingStatus === 'confirmed' && this.paymentStatus === 'completed';
};

// Method to cancel booking
bookingSchema.methods.cancel = async function() {
  this.bookingStatus = 'cancelled';
  await this.save();
  
  // Update bus available seats
  const Bus = mongoose.model('Bus');
  await Bus.findByIdAndUpdate(this.bus, {
    $inc: { availableSeats: 1 }
  });
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 