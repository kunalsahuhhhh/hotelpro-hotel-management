const Room = require('../models/Room');

// @desc    Get all rooms with filter & search
// @route   GET /api/rooms
// @access  Public
const getAllRooms = async (req, res, next) => {
  try {
    const { category, search, maxPrice, status, sort } = req.query;

    let queryObj = {};

    if (category && category !== 'All') {
      queryObj.category = category;
    }

    if (status) {
      queryObj.status = status;
    }

    if (maxPrice) {
      queryObj.price = { $lte: Number(maxPrice) };
    }

    if (search) {
      queryObj.$or = [
        { title: { $regex: search, $options: 'i' } },
        { roomNumber: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let query = Room.find(queryObj);

    if (sort === 'price-low') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const rooms = await query;

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new room (Admin only)
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res, next) => {
  try {
    const existing = await Room.findOne({ roomNumber: req.body.roomNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Room number already exists' });
    }

    const room = await Room.create(req.body);

    res.status(201).json({
      success: true,
      room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update room details
// @route   PUT /api/rooms/:id
// @access  Private/Staff/Admin
const updateRoom = async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    await room.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Room deleted from inventory'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom };
