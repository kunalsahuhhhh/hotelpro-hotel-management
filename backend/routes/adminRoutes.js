const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  checkInGuest,
  checkOutGuest,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin', 'staff'));

router.get('/bookings', getAllBookings);
router.put('/bookings/:id/checkin', checkInGuest);
router.put('/bookings/:id/checkout', checkOutGuest);
router.get('/stats', authorize('admin'), getDashboardStats);

module.exports = router;
