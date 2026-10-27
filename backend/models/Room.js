const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Please add a room number'],
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Please add a room title'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please specify category'],
      enum: ['Suites', 'Penthouse', 'Villas', 'Standard', 'Deluxe'],
      default: 'Suites'
    },
    price: {
      type: Number,
      required: [true, 'Please set night rate'],
      min: [0, 'Price must be positive']
    },
    capacity: {
      type: Number,
      required: [true, 'Please set max guest capacity'],
      default: 2
    },
    beds: {
      type: String,
      default: '1 King Bed'
    },
    size: {
      type: String,
      default: '450 sq ft'
    },
    description: {
      type: String,
      required: [true, 'Please add room description']
    },
    amenities: {
      type: [String],
      default: ['High-speed Wi-Fi', 'Air Conditioning', 'En-suite Bath', 'Smart TV']
    },
    images: {
      type: [String],
      default: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80']
    },
    status: {
      type: String,
      enum: ['available', 'occupied', 'reserved', 'maintenance'],
      default: 'available'
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Room', roomSchema);
