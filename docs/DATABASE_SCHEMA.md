# HotelPro - Database Schema & Data Dictionary

Database System: **MongoDB (NoSQL Document Store)**  
Object Data Modeling (ODM): **Mongoose**

---

## Entity Relationship Overview

```
 [User] 1 --------< N [Booking] >-------- 1 [Room]
   |                      |
   |                      |
   v                      v
[Review]              [Payment]
```

---

## 1. Users Collection (`users`)
Stores user profiles across three authorization roles: `guest`, `staff`, and `admin`.

| Field Name | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | System generated |
| `name` | String | Required, Max 50 | Full name of the user |
| `email` | String | Required, Unique, Lowercase | User email address |
| `password` | String | Required, Min 6 (Hashed) | BCrypt hashed password |
| `role` | String | Enum: `guest`, `staff`, `admin` | Role for RBAC authorization |
| `phone` | String | Optional | Contact phone number |
| `avatar` | String | URL | Profile avatar image |
| `createdAt` | Date | Timestamp | Record creation timestamp |

---

## 2. Rooms Collection (`rooms`)
Represents individual hotel suites, penthouses, and accommodations.

| Field Name | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique suite identifier |
| `roomNumber` | String | Required, Unique | Room number (e.g., 101, 205) |
| `title` | String | Required | Descriptive suite name |
| `category` | String | Enum: `Suites`, `Penthouse`, `Villas`, `Standard` | Suite luxury tier |
| `price` | Number | Required, Min 0 | Nightly rate in USD |
| `capacity` | Number | Required, Min 1 | Maximum adult guests |
| `beds` | String | Required | Bed configuration (e.g., 1 King Bed) |
| `size` | String | Optional | Floor space in sq ft |
| `description`| String | Required | Marketing & architectural details |
| `amenities` | [String] | Array | Features: Jacuzzi, Ocean View, Wi-Fi |
| `images` | [String] | Array of URLs | High-resolution photography |
| `status` | String | Enum: `available`, `occupied`, `reserved`, `maintenance` | Real-time floor status |
| `rating` | Number | Default: 4.8 | Guest review rating |
| `reviewsCount`| Number | Default: 0 | Total reviews submitted |

---

## 3. Bookings Collection (`bookings`)
Core transactional record connecting guests to reserved suites.

| Field Name | Type | Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | MongoDB identifier |
| `bookingReference`| String | Required, Unique | Public folio code (e.g., `HP-9104`) |
| `user` | ObjectId | Ref: `User` | User who placed the reservation |
| `room` | ObjectId | Ref: `Room` | Assigned suite |
| `guestName` | String | Required | Primary guest full name |
| `guestEmail`| String | Required | Guest email address |
| `guestPhone`| String | Required | Guest contact number |
| `checkInDate`| Date | Required | Reservation start date |
| `checkOutDate`| Date | Required | Reservation departure date |
| `nights` | Number | Min 1 | Calculated length of stay |
| `guestsCount`| Number | Min 1 | Number of occupants |
| `ratePerNight`| Number | Required | Locked-in nightly rate |
| `taxes` | Number | Required | 12% state tax and resort fees |
| `totalAmount`| Number | Required | Final payable charge |
| `paymentStatus`| String | Enum: `paid`, `pending`, `refunded` | Financial settlement status |
| `paymentMethod`| String | Default: `Credit Card` | Payment provider used |
| `bookingStatus`| String | Enum: `confirmed`, `checked-in`, `checked-out`, `cancelled` | PMS lifecycle status |
| `specialRequests`| String| Optional | Concierge requests |

---

## 4. Payments Collection (`payments`)
Financial audit trail for room charges and refunds.

| Field Name | Type | Description |
|---|---|---|
| `_id` | ObjectId | Payment ID |
| `transactionId` | String | Unique gateway transaction reference |
| `booking` | ObjectId | Ref: `Booking` |
| `user` | ObjectId | Ref: `User` |
| `amount` | Number | Total transaction amount |
| `currency` | String | ISO currency code (USD) |
| `status` | String | `succeeded`, `pending`, `refunded` |
