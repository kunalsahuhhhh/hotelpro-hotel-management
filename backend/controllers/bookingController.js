const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Payment = require('../models/Payment');

// @desc    Create new booking reservation
// @route   POST /api/bookings
// @access  Private/Guest
const createBooking = async (req, res, next) => {
  try {
    const {
      roomId,
      checkInDate,
      checkOutDate,
      guestsCount,
      guestName,
      guestEmail,
      guestPhone,
      paymentMethod,
      specialRequests
    } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    if (room.status === 'occupied' || room.status === 'maintenance') {
      return res.status(400).json({ success: false, message: `Room is currently ${room.status} and unavailable` });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date' });
    }

    const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const subtotal = nights * room.price;
    const taxes = Number((subtotal * 0.12).toFixed(2));
    const totalAmount = Number((subtotal + taxes).toFixed(2));

    const bookingRef = `HP-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await Booking.create({
      bookingReference: bookingRef,
      user: req.user._id,
      guestName: guestName || req.user.name,
      guestEmail: guestEmail || req.user.email,
      guestPhone: guestPhone || req.user.phone,
      room: room._id,
      checkInDate,
      checkOutDate,
      nights,
      guestsCount: guestsCount || 1,
      ratePerNight: room.price,
      taxes,
      totalAmount,
      paymentStatus: 'paid',
      paymentMethod: paymentMethod || 'Credit Card (Instant)',
      bookingStatus: 'confirmed',
      specialRequests: specialRequests || 'None'
    });

    // Record Payment
    await Payment.create({
      transactionId: `TXN-${Date.now()}`,
      booking: booking._id,
      user: req.user._id,
      amount: totalAmount,
      paymentMethod: paymentMethod || 'Credit Card',
      status: 'succeeded'
    });

    // Mark room reserved
    room.status = 'reserved';
    await room.save();

    res.status(201).json({
      success: true,
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('room', 'roomNumber title category image price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking details by reference / ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    // Release room
    const room = await Room.findById(booking.room);
    if (room && room.status === 'reserved') {
      room.status = 'available';
      await room.save();
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled and refunded successfully',
      booking
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getMyBookings, getBookingById, cancelBooking };
