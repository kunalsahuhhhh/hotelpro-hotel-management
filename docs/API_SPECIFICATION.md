# HotelPro - RESTful API Specification

All API endpoints return JSON responses using standard HTTP response status codes.

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Creates a new user account.
- **Access:** Public
- **Request Body:**
```json
{
  "name": "Alexander Wright",
  "email": "alex@example.com",
  "password": "password123",
  "role": "guest",
  "phone": "+1 (555) 234-5678"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "662a8ef...",
    "name": "Alexander Wright",
    "email": "alex@example.com",
    "role": "guest",
    "phone": "+1 (555) 234-5678"
  }
}
```

### `POST /api/auth/login`
Authenticates existing user and returns JWT token.
- **Access:** Public
- **Request Body:**
```json
{
  "email": "admin@hotelpro.com",
  "password": "password123"
}
```

### `GET /api/auth/me`
Retrieves currently logged-in user profile.
- **Access:** Private (Bearer Token required)

---

## 2. Room Endpoints (`/api/rooms`)

### `GET /api/rooms`
Retrieve catalog of rooms with optional query parameters.
- **Query Parameters:**
  - `category`: `Suites` | `Penthouse` | `Villas` | `Standard`
  - `search`: Room number or keyword
  - `maxPrice`: Max price per night
  - `sort`: `price-low` | `price-high` | `rating`
- **Response (200 OK):**
```json
{
  "success": true,
  "count": 6,
  "rooms": [
    {
      "_id": "662b9...",
      "roomNumber": "101",
      "title": "Deluxe Oceanfront Suite",
      "category": "Suites",
      "price": 295,
      "capacity": 2,
      "beds": "1 King Bed",
      "status": "available",
      "rating": 4.9,
      "amenities": ["Ocean View", "Private Balcony", "High-speed Wi-Fi"]
    }
  ]
}
```

### `POST /api/rooms`
Create a new suite entry.
- **Access:** Private (Admin only)

### `PUT /api/rooms/:id`
Update suite details or operational status (`available`, `occupied`, `reserved`, `maintenance`).
- **Access:** Private (Staff / Admin)

---

## 3. Booking Endpoints (`/api/bookings`)

### `POST /api/bookings`
Reserve a suite and process payment simulation.
- **Access:** Private (Guest)
- **Request Body:**
```json
{
  "roomId": "662b9...",
  "checkInDate": "2026-11-05",
  "checkOutDate": "2026-11-08",
  "guestsCount": 2,
  "guestName": "Alexander Wright",
  "guestEmail": "guest@example.com",
  "guestPhone": "+1 (555) 234-5678",
  "paymentMethod": "Credit Card (Instant)",
  "specialRequests": "Ocean view balcony requested"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "booking": {
    "bookingReference": "HP-7419",
    "nights": 3,
    "ratePerNight": 295,
    "taxes": 106.20,
    "totalAmount": 991.20,
    "paymentStatus": "paid",
    "bookingStatus": "confirmed"
  }
}
```

### `GET /api/bookings/my-bookings`
Retrieve all reservations made by the logged-in user.
- **Access:** Private (Guest)

### `PUT /api/bookings/:id/cancel`
Cancel an existing reservation, release room to available inventory, and issue full refund.
- **Access:** Private (Guest / Admin)

---

## 4. Admin & Front Desk Endpoints (`/api/admin`)

### `GET /api/admin/bookings`
List all hotel bookings with guest details and filter by status.
- **Access:** Private (Staff / Admin)

### `PUT /api/admin/bookings/:id/checkin`
Front desk action to check in guest and mark room `occupied`.
- **Access:** Private (Staff / Admin)

### `PUT /api/admin/bookings/:id/checkout`
Front desk action to check out guest and release room to housekeeping.
- **Access:** Private (Staff / Admin)

### `GET /api/admin/stats`
Returns total revenue, occupancy %, active in-house guests, and expected arrivals.
- **Access:** Private (Admin)
