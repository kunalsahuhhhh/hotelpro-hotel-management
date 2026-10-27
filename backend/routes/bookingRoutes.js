const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createBooking);

router.get('/my-bookings', getMyBookings);

router.route('/:id')
  .get(getBookingById);

router.put('/:id/cancel', cancelBooking);

module.exports = router;
