# HotelPro - Complete Architecture & Epics Mapping
**Capstone Project - Full Stack Development (MERN Stack)**

---

## 1. System Overview & Problem Statement
The modern hospitality industry demands high availability, instantaneous reservation synchronization, contactless guest verification, and real-time room status visibility for front desk personnel.

**HotelPro** delivers a full-stack, enterprise-grade Hotel Booking & Management Solution engineered using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It provides a high-performance backend REST API, role-based security with JSON Web Tokens (JWT), real-time floor matrix management, and an interactive luxury guest booking interface.

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|  +---------------------------+  +----------------------+  +------------------+  |
|  | Guest Reservation Portal  |  | Front Desk Desk (PMS)|  | Admin Management |  |
|  | Real-Time Suite Search    |  | Check-in / Check-out |  | Revenue Analytics|  |
|  | Digital Pass QR Voucher   |  | Room Cleaning Matrix |  | Room CRUD Engine |  |
|  +---------------------------+  +----------------------+  +------------------+  |
+----------------------------------------|----------------------------------------+
                                         | RESTful JSON (CORS / JWT)
+----------------------------------------v----------------------------------------+
|                               API GATEWAY & SERVER                              |
|                              Express.js & Node.js                               |
|                                                                                 |
|  [ Auth Router ]      [ Room Router ]      [ Booking Engine ]    [ Admin Router]|
|  /api/auth/*          /api/rooms/*         /api/bookings/*       /api/admin/*   |
|         |                    |                     |                   |        |
|         +--------------------+---------------------+-------------------+        |
|                                         |                                       |
|                           [ JWT & RBAC Middleware ]                             |
|                           [ Error Handling & Logger]                            |
+-----------------------------------------|---------------------------------------+
                                          | Mongoose ODM
+-----------------------------------------v---------------------------------------+
|                                 DATABASE TIER                                   |
|                               MongoDB (NoSQL)                                   |
|                                                                                 |
|   +---------------+   +---------------+   +---------------+   +-------------+   |
|   | Users         |   | Rooms         |   | Bookings      |   | Payments    |   |
|   | Roles/Passwd  |   | Catalog/Floor |   | Check-in/Out  |   | Ledger/Txn  |   |
|   +---------------+   +---------------+   +---------------+   +-------------+   |
+---------------------------------------------------------------------------------+
```

---

## 2. SkillWallet Project Progress: 6 Epics & 19 Tasks Checklist

### Epic 1: Project Architecture (3 Tasks)
- [x] **Task 1: System Architecture & Tech Stack Design** - Designed modular 3-tier MERN architecture with stateless JWT authentication, separation of concerns (Controllers, Services, Models, Routes).
- [x] **Task 2: Database Schema & Entity-Relationship Modeling** - Structured MongoDB schemas for Users (Guest, Staff, Admin), Rooms, Bookings, Payments, and Reviews.
- [x] **Task 3: API Architecture & RESTful Endpoint Design** - Defined REST endpoints with consistent JSON envelope `{ success: true, ... }`, HTTP status codes, and query filtering.

### Epic 2: Project Setup and Configuration (3 Tasks)
- [x] **Task 4: Backend Server Environment Setup** - Configured Express application, `dotenv` environment variables, CORS middleware, body parsers, and health probe `/api/health`.
- [x] **Task 5: Frontend Build & UI Design System Setup** - Built a luxury hospitality UI design system in CSS and React with sapphire/champagne gold palette, responsive grid, and font typography.
- [x] **Task 6: Error Handling & Logger Middleware Setup** - Created centralized custom error handler for Mongoose validation errors, duplicate keys, CastErrors, and 404 routes.

### Epic 3: Database Development (3 Tasks)
- [x] **Task 7: MongoDB Connection & Mongoose Configuration** - Set up robust asynchronous MongoDB connection via `config/db.js` with error handling and retry logic.
- [x] **Task 8: Data Models Implementation** - Implemented Mongoose models (`User`, `Room`, `Booking`, `Payment`, `Review`) with pre-save password hashing and validation rules.
- [x] **Task 9: Database Seeder Script** - Developed `seeder.js` populating realistic suites, penthouses, tropical villas, sample bookings, and staff credentials.

### Epic 4: Backend Development (5 Tasks)
- [x] **Task 10: JWT Authentication & Role-Based Authorization Middleware** - Protected routes using Bearer token verification with roles (`guest`, `staff`, `admin`).
- [x] **Task 11: Room Catalog & Search API** - Built `/api/rooms` with full-text search, category filtering (Suites, Penthouse, Villas, Standard), and price sorting.
- [x] **Task 12: Booking Engine & Pricing Calculator** - Engineered `/api/bookings` with date conflict prevention, nights calculator, 12% tax/resort fee calculation, and auto-generated reference IDs.
- [x] **Task 13: Front Desk Check-in / Check-out Workflow** - Implemented state machine transitions: Confirmed &rarr; Checked-in &rarr; Checked-out &rarr; Turnover.
- [x] **Task 14: Payment Processing & Billing API** - Integrated transaction record generation and simulated instant payment processing.

### Epic 5: Frontend Development (4 Tasks)
- [x] **Task 15: Public Showcase & Search Filters** - Created dynamic hero banner, date pickers, category pills, price range slider, and room cards.
- [x] **Task 16: Interactive Booking Modal & Checkout Flow** - Implemented transparent bill breakdown, guest information form, payment options, and instant confirmation pass.
- [x] **Task 17: Guest Self-Service Bookings Portal** - Built "My Bookings" with digital voucher view, print folio, and reservation cancellation with refund logic.
- [x] **Task 18: Hotel Operations Dashboard** - Developed live KPI metric cards (Revenue, Occupancy %, In-house Guests), real-time floor matrix grid, and Front Desk action table.

### Epic 6: Project Execution & Delivery (1 Task)
- [x] **Task 19: End-to-End System Integration, Testing & Verification** - Delivered zero-dependency instant browser app (`index.html`) + full modular MERN stack codebase (`backend/` & `frontend/`) with documentation.
