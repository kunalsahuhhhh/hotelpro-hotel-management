const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    guestName: {
      type: String,
      required: [true, 'Guest name is required']
    },
    guestEmail: {
      type: String,
      required: [true, 'Guest email is required']
    },
    guestPhone: {
      type: String,
      required: [true, 'Guest phone is required']
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    checkInDate: {
      type: Date,
      required: [true, 'Please provide check-in date']
    },
    checkOutDate: {
      type: Date,
      required: [true, 'Please provide check-out date']
    },
    nights: {
      type: Number,
      required: true,
      min: 1
    },
    guestsCount: {
      type: Number,
      default: 1,
      min: 1
    },
    ratePerNight: {
      type: Number,
      required: true
    },
    taxes: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'paid'
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card (Instant)'
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'checked-in', 'checked-out', 'cancelled'],
      default: 'confirmed'
    },
    specialRequests: {
      type: String,
      default: 'None'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
