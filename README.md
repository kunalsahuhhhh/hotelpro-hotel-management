# 🏨 HotelPro - Complete Hotel Booking and Management Solution

> **Full-Stack Development (MERN Stack) Capstone Project**  
> Solves all 6 Epics and 19 Tasks from the SkillWallet curriculum.

[![MERN Stack](https://img.shields.io/badge/Stack-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node-blue.svg)](https://nodejs.org)
[![JWT Authentication](https://img.shields.io/badge/Security-JWT%20Bearer%20%26%20RBAC-green.svg)](https://jwt.io)
[![Status](https://img.shields.io/badge/Status-100%25%20Complete%20(19%2F19%20Tasks)-brightgreen.svg)](#skillwallet-project-stats-6-epics--19-tasks)

---

## 🌟 Executive Summary

**HotelPro** is an enterprise-grade hospitality management and booking ecosystem designed to eliminate operational friction in modern hotels, boutique resorts, and multi-property chains.

### Key Capabilities:
- **Real-Time Booking Engine**: Instant reservation calculations with dates, guest capacities, and automated 12% hospitality tax & fee breakdown.
- **Contactless Guest Passes (Digital Folio)**: Generates printable hotel vouchers with embedded QR pass simulation for rapid front desk check-in.
- **Front Desk Operations Desk**: One-click **Check-In** and **Check-Out** state machine, auto-toggling room states (`Available` &rarr; `Occupied` &rarr; `Cleaning/Housekeeping`).
- **Interactive Floor Inventory Matrix**: Color-coded live visual grid of every suite in the property.
- **Executive Revenue Dashboard**: Live KPIs for Gross Revenue, Occupancy Rate %, Active In-House Guests, and Expected Arrivals.
- **Multi-Role Authentication & Simulator**: Switch between **Guest**, **Front Desk Staff**, and **General Manager (Admin)** with one click.
- **Data Export**: One-click CSV export of guest registry and transaction folios.

---

## ⚡ Instant Quick Start (Zero Setup Needed)

You do **not** need to install Node.js, npm, or MongoDB right away to test and present this project!

1. Navigate to:
   ```
   C:\Users\Lenovo\.gemini\antigravity\scratch\hotelpro\
   ```
2. Double-click or open **`index.html`** in any browser (Google Chrome, Firefox, Microsoft Edge, Opera).
3. The full application loads instantly with:
   - Complete seeded inventory of luxury suites and penthouses
   - Real-time booking calculation and printable QR folio modal
   - Guest self-service portal ("My Bookings")
   - Front Desk PMS operations desk with Check-In / Check-Out actions
   - Interactive Floor Matrix and Financial KPIs
   - Role switcher banner at the very top (Guest / Front Desk / Admin)

---

## 📊 SkillWallet Project Stats: 6 Epics & 19 Tasks

HotelPro has been specifically architected and verified against the **SkillWallet Course Curriculum**:

| Epic # | Module Name | Tasks Complete | Status |
|---|---|---|---|
| **Epic 1** | Project Architecture | 3 Tasks (System Design, ER Models, REST API Plan) | ✅ Complete |
| **Epic 2** | Project Setup and Configuration | 3 Tasks (Server Setup, UI Design System, Error Handler) | ✅ Complete |
| **Epic 3** | Database Development | 3 Tasks (MongoDB Connection, 5 Models, Seeder Script) | ✅ Complete |
| **Epic 4** | Backend Development | 5 Tasks (JWT Auth, Room APIs, Booking Engine, Check-in Desk, Payments) | ✅ Complete |
| **Epic 5** | Frontend Development | 4 Tasks (Public Portal, Booking Modal, Guest Desk, Admin Dashboard) | ✅ Complete |
| **Epic 6** | Project Execution | 1 Task (End-to-End Integration, Seed Data & Deployment) | ✅ Complete |
| **Total** | **6 Epics** | **19 of 19 Tasks (100%)** | 🏆 **Ready for Submission** |

---

## 📂 Project Directory Structure

```
hotelpro/
│
├── index.html                   # Standalone Live Production Web Application (Instant Run)
├── app.js                       # Core Engine, State Management, Simulated API & LocalStorage
├── styles.css                   # Luxury Hospitality Design System (Sapphire & Champagne Gold)
├── README.md                    # Project Documentation & Evaluation Guide
│
├── backend/                     # Complete MERN Backend (Node.js & Express.js)
│   ├── package.json             # Express, Mongoose, JWT, BCrypt, CORS dependencies
│   ├── server.js                # Server entry point & API router mounting
│   ├── .env.example             # Environment variable template
│   ├── seeder.js                # Database seed script for luxury suites & test users
│   ├── config/
│   │   └── db.js                # Asynchronous MongoDB Mongoose connection
│   ├── models/
│   │   ├── User.js              # Guest, Staff & Admin schemas with BCrypt hashing
│   │   ├── Room.js              # Suite catalog, amenities, pricing & status
│   │   ├── Booking.js           # Reservation dates, pricing, guests, check-in status
│   │   ├── Payment.js           # Transaction ledger & gateway simulation
│   │   └── Review.js            # Guest ratings & comments
│   ├── controllers/
│   │   ├── authController.js    # Register, Login & Profile endpoints
│   │   ├── roomController.js    # CRUD, search & filtering by price/category
│   │   ├── bookingController.js # Reservation workflow, dates validation & cancellation
│   │   └── adminController.js   # Front desk check-in/out & financial analytics
│   ├── middleware/
│   │   ├── authMiddleware.js    # Bearer JWT verification & Role-Based Access Control
│   │   └── errorMiddleware.js   # Centralized error handler & 404 router
│   └── routes/
│       ├── authRoutes.js        # /api/auth routes
│       ├── roomRoutes.js        # /api/rooms routes
│       ├── bookingRoutes.js     # /api/bookings routes
│       └── adminRoutes.js       # /api/admin routes
│
├── frontend/                    # Modular React.js Application
│   ├── package.json             # React, Vite, Axios, Lucide Icons dependencies
│   ├── vite.config.js           # Vite development server & API proxy config
│   ├── index.html               # Frontend HTML root
│   └── src/
│       ├── main.jsx             # React entry DOM root
│       ├── App.jsx              # Main App orchestrator with state & persona router
│       ├── components/
│       │   ├── Navbar.jsx       # Header & Role switcher
│       │   ├── Hero.jsx         # Luxury banner & quick search bar
│       │   ├── RoomCard.jsx     # Suite showcase card
│       │   ├── BookingModal.jsx # Reservation form & transparent price breakdown
│       │   ├── InvoiceModal.jsx # Printable digital check-in voucher & QR pass
│       │   ├── AdminDashboard.jsx # KPI metrics, floor matrix & check-in ledger
│       │   └── GuestPortal.jsx  # Guest's "My Bookings" management
│       └── services/
│           └── api.js           # Axios API client with JWT interceptor
│
└── docs/                        # Complete Technical Documentation
    ├── ARCHITECTURE.md          # 6 Epics & 19 Tasks breakdown & MERN architecture
    ├── API_SPECIFICATION.md     # REST API endpoint reference with JSON payloads
    └── DATABASE_SCHEMA.md       # MongoDB collections, data dictionary & ER diagram
```

---

## 🛠️ Full MERN Stack Setup Guide (For Node.js / MongoDB)

When ready to run with a live Node.js and MongoDB backend:

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Populate sample luxury suites, admin & guest accounts into MongoDB
npm run seed

# Start Express REST API server (runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup
```bash
cd ../frontend
npm install

# Start Vite React development server (runs on http://localhost:3000)
npm run dev
```

---

## 🔑 Default Test Accounts & Roles

| Role | Email Address | Password | Permissions |
|---|---|---|---|
| **General Manager (Admin)** | `admin@hotelpro.com` | `password123` | Full control over revenue, suite CRUD, occupancy analytics & all bookings |
| **Front Desk Staff** | `clerk@hotelpro.com` | `password123` | Front desk PMS desk, guest check-in, check-out, room turnover matrix |
| **Guest** | `guest@example.com` | `password123` | Suite browsing, instant reservations, digital folio vouchers & cancellations |

*(In the live app `index.html`, you can switch between these roles anytime using the top role banner or badge without re-logging in!)*

---

## 📝 Submission Links for SkillWallet Portal
- **Demo Link**: Open `hotelpro/index.html` in your browser.
- **GitHub Link**: Ready to push the `hotelpro/` folder directly to GitHub repository (`git init`, `git add .`, `git commit -m "HotelPro - Complete hotel booking and management solution"`, `git push`).
