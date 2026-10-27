const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');

// @desc    Get all bookings (Front desk & Admin)
// @route   GET /api/admin/bookings
// @access  Private/Staff/Admin
const getAllBookings = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let queryObj = {};

    if (status) {
      queryObj.bookingStatus = status;
    }

    if (search) {
      queryObj.$or = [
        { bookingReference: { $regex: search, $options: 'i' } },
        { guestName: { $regex: search, $options: 'i' } },
        { guestEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(queryObj)
      .populate('room')
      .populate('user', 'name email phone')
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

// @desc    Front desk check-in action
// @route   PUT /api/admin/bookings/:id/checkin
// @access  Private/Staff/Admin
const checkInGuest = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.bookingStatus = 'checked-in';
    await booking.save();

    // Set room to occupied
    await Room.findByIdAndUpdate(booking.room, { status: 'occupied' });

    res.status(200).json({
      success: true,
      message: `Guest ${booking.guestName} successfully checked in`,
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Front desk check-out action
// @route   PUT /api/admin/bookings/:id/checkout
// @access  Private/Staff/Admin
const checkOutGuest = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.bookingStatus = 'checked-out';
    await booking.save();

    // Free the room back to available or housekeeping
    await Room.findByIdAndUpdate(booking.room, { status: 'available' });

    res.status(200).json({
      success: true,
      message: `Guest ${booking.guestName} checked out successfully`,
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Admin KPI & Financial Metrics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
    const reservedRooms = await Room.countDocuments({ status: 'reserved' });
    const availableRooms = await Room.countDocuments({ status: 'available' });

    const occupancyRate = totalRooms > 0 
      ? Math.round(((occupiedRooms + reservedRooms) / totalRooms) * 100) 
      : 0;

    const activeCheckIns = await Booking.countDocuments({ bookingStatus: 'checked-in' });
    const expectedArrivals = await Booking.countDocuments({ bookingStatus: 'confirmed' });

    // Calculate total revenue from valid bookings
    const bookings = await Booking.find({ bookingStatus: { $ne: 'cancelled' } });
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        occupancyRate,
        totalRooms,
        occupiedRooms,
        reservedRooms,
        availableRooms,
        activeCheckIns,
        expectedArrivals
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBookings, checkInGuest, checkOutGuest, getDashboardStats };
