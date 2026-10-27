const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Payment = require('./models/Payment');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const users = [
  {
    name: 'Eleanor Vance (General Manager)',
    email: 'admin@hotelpro.com',
    password: 'password123',
    role: 'admin',
    phone: '+1 (555) 100-2000'
  },
  {
    name: 'Marcus Brody (Front Desk Supervisor)',
    email: 'clerk@hotelpro.com',
    password: 'password123',
    role: 'staff',
    phone: '+1 (555) 100-3000'
  },
  {
    name: 'Alexander Wright',
    email: 'guest@example.com',
    password: 'password123',
    role: 'guest',
    phone: '+1 (555) 234-5678'
  }
];

const rooms = [
  {
    roomNumber: '101',
    title: 'Deluxe Oceanfront Suite',
    category: 'Suites',
    price: 295,
    capacity: 2,
    beds: '1 King Bed',
    size: '520 sq ft',
    status: 'available',
    rating: 4.9,
    reviewsCount: 142,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Ocean View', 'Private Balcony', 'High-speed Wi-Fi', 'Espresso Bar', 'Marble Bathroom', 'Breakfast Included'],
    description: 'Indulge in unmatched coastal elegance. Features panoramic sea views, a lavish king-size bed, private teak balcony, and rainfall shower.'
  },
  {
    roomNumber: '205',
    title: 'Executive Skyline Penthouse',
    category: 'Penthouse',
    price: 680,
    capacity: 4,
    beds: '2 King Beds',
    size: '1150 sq ft',
    status: 'occupied',
    rating: 5.0,
    reviewsCount: 88,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Skyline Terrace', 'Personal Butler', 'Jacuzzi Spa', 'Cocktail Bar', 'Smart Home Automation', 'VIP Airport Transfer'],
    description: 'The pinnacle of luxury atop the highest tier. Offers sprawling city vistas, private rooftop terrace with jacuzzi, and 24/7 dedicated butler service.'
  },
  {
    roomNumber: '304',
    title: 'Royal Tropical Villa',
    category: 'Villas',
    price: 490,
    capacity: 4,
    beds: '1 King + 2 Queen',
    size: '920 sq ft',
    status: 'available',
    rating: 4.8,
    reviewsCount: 96,
    images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Private Plunge Pool', 'Lush Garden', 'Outdoor Cabana', 'Kitchenette', 'Complimentary Wine', 'Valet Parking'],
    description: 'Secluded haven surrounded by exotic botanical gardens. Features your own private plunge pool, open-air sun loungers, and gourmet in-room dining.'
  },
  {
    roomNumber: '108',
    title: 'Grand Premier King',
    category: 'Suites',
    price: 210,
    capacity: 2,
    beds: '1 King Bed',
    size: '440 sq ft',
    status: 'reserved',
    rating: 4.7,
    reviewsCount: 110,
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['City View', 'Smart TV 65"', 'Ergonomic Desk', 'Fast Wi-Fi', 'Rain Shower', 'Mini Bar'],
    description: 'Designed for business travelers and leisure connoisseurs seeking sophisticated comfort, seamless connectivity, and bespoke furnishings.'
  },
  {
    roomNumber: '212',
    title: 'Heritage Garden Courtyard',
    category: 'Standard',
    price: 165,
    capacity: 2,
    beds: '1 Queen Bed',
    size: '380 sq ft',
    status: 'available',
    rating: 4.6,
    reviewsCount: 74,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Courtyard Patio', 'Artisan Tea Set', 'Organic Toiletries', 'Free Wi-Fi', 'AC Climate Control'],
    description: 'Charming tranquility overlooking our private stone fountain and rose pavilion. A serene oasis for restful getaways.'
  },
  {
    roomNumber: '115',
    title: 'Classic Twin Deluxe',
    category: 'Standard',
    price: 145,
    capacity: 2,
    beds: '2 Twin Beds',
    size: '360 sq ft',
    status: 'maintenance',
    rating: 4.5,
    reviewsCount: 62,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80'],
    amenities: ['Twin Beds', 'High-Speed Wi-Fi', 'Coffee Maker', 'Safe Box', 'Daily Housekeeping'],
    description: 'Clean, functional, and inviting accommodations with dual twin bedding, perfect for colleagues, friends, or family duos.'
  }
];

const importData = async () => {
  try {
    await Booking.deleteMany();
    await Payment.deleteMany();
    await Room.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);
    const guestUser = createdUsers[2];

    const createdRooms = await Room.create(rooms);

    // Create Sample Booking
    const sampleBooking = await Booking.create({
      bookingReference: 'HP-9104',
      user: guestUser._id,
      guestName: guestUser.name,
      guestEmail: guestUser.email,
      guestPhone: guestUser.phone,
      room: createdRooms[1]._id, // Penthouse
      checkInDate: new Date('2026-10-26'),
      checkOutDate: new Date('2026-10-30'),
      nights: 4,
      guestsCount: 2,
      ratePerNight: 680,
      taxes: 326.40,
      totalAmount: 3046.40,
      paymentMethod: 'Credit Card (Amex)',
      paymentStatus: 'paid',
      bookingStatus: 'checked-in',
      specialRequests: 'High floor, champagne on arrival.'
    });

    await Payment.create({
      transactionId: 'TXN-984210',
      booking: sampleBooking._id,
      user: guestUser._id,
      amount: 3046.40,
      paymentMethod: 'Credit Card',
      status: 'succeeded'
    });

    console.log('✅ HotelPro Database Successfully Seeded with Luxury Rooms, Users & Bookings!');
    process.exit();
  } catch (err) {
    console.error(`❌ Seeder Error: ${err.message}`);
    process.exit(1);
  }
};

importData();
