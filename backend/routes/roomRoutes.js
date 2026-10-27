const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllRooms)
  .post(protect, authorize('admin'), createRoom);

router.route('/:id')
  .get(getRoomById)
  .put(protect, authorize('admin', 'staff'), updateRoom)
  .delete(protect, authorize('admin'), deleteRoom);

module.exports = router;
