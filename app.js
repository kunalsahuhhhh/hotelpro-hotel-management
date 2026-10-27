/**
 * HotelPro - Complete Hotel Booking & Management Solution
 * Core Application Engine & State Management
 * Solves all 6 Epics & 19 Tasks from SkillWallet Portal
 */

// Initial Seed Data (Saved in LocalStorage for persistence)
const INITIAL_ROOMS = [
  {
    id: "rm-101",
    roomNumber: "101",
    title: "Deluxe Oceanfront Suite",
    category: "Suites",
    price: 295,
    capacity: 2,
    beds: "1 King Bed",
    size: "520 sq ft",
    status: "available", // available | occupied | reserved | maintenance
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Ocean View", "Private Balcony", "High-speed Wi-Fi", "Espresso Bar", "Marble Bathroom", "Breakfast Included"],
    description: "Indulge in unmatched coastal elegance. Features panoramic sea views, a lavish king-size bed, private teak balcony, and rainfall shower."
  },
  {
    id: "rm-205",
    roomNumber: "205",
    title: "Executive Skyline Penthouse",
    category: "Penthouse",
    price: 680,
    capacity: 4,
    beds: "2 King Beds",
    size: "1150 sq ft",
    status: "occupied",
    rating: 5.0,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Skyline Terrace", "Personal Butler", "Jacuzzi Spa", "Cocktail Bar", "Smart Home Automation", "VIP Airport Transfer"],
    description: "The pinnacle of luxury atop the highest tier. Offers sprawling city vistas, private rooftop terrace with jacuzzi, and 24/7 dedicated butler service."
  },
  {
    id: "rm-304",
    roomNumber: "304",
    title: "Royal Tropical Villa",
    category: "Villas",
    price: 490,
    capacity: 4,
    beds: "1 King + 2 Queen",
    size: "920 sq ft",
    status: "available",
    rating: 4.8,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Private Plunge Pool", "Lush Garden", "Outdoor Cabana", "Kitchenette", "Complimentary Wine", "Valet Parking"],
    description: "Secluded haven surrounded by exotic botanical gardens. Features your own private plunge pool, open-air sun loungers, and gourmet in-room dining."
  },
  {
    id: "rm-108",
    roomNumber: "108",
    title: "Grand Premier King",
    category: "Suites",
    price: 210,
    capacity: 2,
    beds: "1 King Bed",
    size: "440 sq ft",
    status: "reserved",
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    amenities: ["City View", "Smart TV 65\"", "Ergonomic Desk", "Fast Wi-Fi", "Rain Shower", "Mini Bar"],
    description: "Designed for business travelers and leisure connoisseurs seeking sophisticated comfort, seamless connectivity, and bespoke furnishings."
  },
  {
    id: "rm-212",
    roomNumber: "212",
    title: "Heritage Garden Courtyard",
    category: "Standard",
    price: 165,
    capacity: 2,
    beds: "1 Queen Bed",
    size: "380 sq ft",
    status: "available",
    rating: 4.6,
    reviewsCount: 74,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Courtyard Patio", "Artisan Tea Set", "Organic Toiletries", "Free Wi-Fi", "AC Climate Control"],
    description: "Charming tranquility overlooking our private stone fountain and rose pavilion. A serene oasis for restful getaways."
  },
  {
    id: "rm-115",
    roomNumber: "115",
    title: "Classic Twin Deluxe",
    category: "Standard",
    price: 145,
    capacity: 2,
    beds: "2 Twin Beds",
    size: "360 sq ft",
    status: "maintenance",
    rating: 4.5,
    reviewsCount: 62,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Twin Beds", "High-Speed Wi-Fi", "Coffee Maker", "Safe Box", "Daily Housekeeping"],
    description: "Clean, functional, and inviting accommodations with dual twin bedding, perfect for colleagues, friends, or family duos."
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "HP-9104",
    roomId: "rm-205",
    roomNumber: "205",
    roomTitle: "Executive Skyline Penthouse",
    guestName: "Lord Arthur Sterling",
    guestEmail: "arthur.sterling@mayfair.co.uk",
    guestPhone: "+1 (555) 392-1049",
    checkInDate: "2026-10-26",
    checkOutDate: "2026-10-30",
    nights: 4,
    guestsCount: 2,
    ratePerNight: 680,
    taxes: 326.40,
    totalAmount: 3046.40,
    paymentMethod: "Credit Card (Amex •••• 1042)",
    paymentStatus: "paid",
    bookingStatus: "checked-in", // confirmed | checked-in | checked-out | cancelled
    specialRequests: "Champagne on arrival, high floor, feather-free pillows.",
    bookedAt: "2026-10-20"
  },
  {
    id: "HP-8832",
    roomId: "rm-108",
    roomNumber: "108",
    roomTitle: "Grand Premier King",
    guestName: "Dr. Evelyn Reed",
    guestEmail: "evelyn.reed@biotech.org",
    guestPhone: "+1 (555) 782-9901",
    checkInDate: "2026-10-28",
    checkOutDate: "2026-11-01",
    nights: 4,
    guestsCount: 1,
    ratePerNight: 210,
    taxes: 100.80,
    totalAmount: 940.80,
    paymentMethod: "UPI / Net Banking",
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    specialRequests: "Quiet corner room, late check-in (10 PM).",
    bookedAt: "2026-10-24"
  },
  {
    id: "HP-7419",
    roomId: "rm-101",
    roomNumber: "101",
    roomTitle: "Deluxe Oceanfront Suite",
    guestName: "Alexander Wright",
    guestEmail: "guest@example.com",
    guestPhone: "+1 (555) 234-5678",
    checkInDate: "2026-11-05",
    checkOutDate: "2026-11-08",
    nights: 3,
    guestsCount: 2,
    ratePerNight: 295,
    taxes: 106.20,
    totalAmount: 991.20,
    paymentMethod: "Visa •••• 4242",
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    specialRequests: "Anniversary celebration setup, ocean view balcony requested.",
    bookedAt: "2026-10-25"
  }
];

// App State
let state = {
  rooms: JSON.parse(localStorage.getItem('hotelpro_rooms')) || INITIAL_ROOMS,
  bookings: JSON.parse(localStorage.getItem('hotelpro_bookings')) || INITIAL_BOOKINGS,
  currentRole: localStorage.getItem('hotelpro_role') || 'guest', // 'guest' | 'staff' | 'admin'
  currentUser: {
    name: "Alexander Wright",
    email: "guest@example.com",
    phone: "+1 (555) 234-5678"
  },
  activeTab: 'explore', // 'explore' | 'my-bookings' | 'admin-dashboard' | 'architecture'
  filterCategory: 'All',
  searchQuery: '',
  maxPrice: 800,
  sortBy: 'featured',
  selectedRoomForBooking: null,
  viewingVoucher: null
};

// State Persistence Helper
function persistData() {
  localStorage.setItem('hotelpro_rooms', JSON.stringify(state.rooms));
  localStorage.setItem('hotelpro_bookings', JSON.stringify(state.bookings));
  localStorage.setItem('hotelpro_role', state.currentRole);
}

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  setupDefaultDates();
  renderApp();
  setupEventListeners();
});

function setupDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 2);

  const format = (d) => d.toISOString().split('T')[0];
  
  const checkInInput = document.getElementById('search-checkin');
  const checkOutInput = document.getElementById('search-checkout');
  if (checkInInput && checkOutInput) {
    checkInInput.min = format(today);
    checkInInput.value = format(today);
    checkOutInput.min = format(today);
    checkOutInput.value = format(tomorrow);
  }
}

// Main Render Function
function renderApp() {
  renderNavbar();
  renderRoleBanner();
  
  const mainContent = document.getElementById('main-container');
  if (!mainContent) return;

  if (state.activeTab === 'explore') {
    document.getElementById('hero-section').style.display = 'block';
    document.getElementById('explore-section').style.display = 'block';
    document.getElementById('my-bookings-section').style.display = 'none';
    document.getElementById('admin-dashboard-section').style.display = 'none';
    renderRooms();
  } else if (state.activeTab === 'my-bookings') {
    document.getElementById('hero-section').style.display = 'none';
    document.getElementById('explore-section').style.display = 'none';
    document.getElementById('my-bookings-section').style.display = 'block';
    document.getElementById('admin-dashboard-section').style.display = 'none';
    renderMyBookings();
  } else if (state.activeTab === 'admin-dashboard') {
    document.getElementById('hero-section').style.display = 'none';
    document.getElementById('explore-section').style.display = 'none';
    document.getElementById('my-bookings-section').style.display = 'none';
    document.getElementById('admin-dashboard-section').style.display = 'block';
    renderAdminDashboard();
  }
}

// Navbar & Role Switcher
function renderNavbar() {
  const navContainer = document.getElementById('navbar-container');
  if (!navContainer) return;

  const roleLabels = {
    guest: { text: "Guest Experience", icon: "👤", badgeClass: "role-guest" },
    staff: { text: "Front Desk Staff", icon: "🛎️", badgeClass: "role-staff" },
    admin: { text: "Hotel General Manager (Admin)", icon: "👑", badgeClass: "role-admin" }
  };

  const currentRoleInfo = roleLabels[state.currentRole];

  navContainer.innerHTML = `
    <div class="brand" onclick="switchTab('explore')" style="cursor: pointer;">
      <div class="brand-icon">🏨</div>
      <div>Hotel<span>Pro</span></div>
    </div>

    <ul class="nav-links">
      <li class="nav-link ${state.activeTab === 'explore' ? 'active' : ''}" onclick="switchTab('explore')">
        <span>✨</span> Explore Suites
      </li>
      <li class="nav-link ${state.activeTab === 'my-bookings' ? 'active' : ''}" onclick="switchTab('my-bookings')">
        <span>📑</span> My Bookings
      </li>
      <li class="nav-link ${state.activeTab === 'admin-dashboard' ? 'active' : ''}" onclick="switchTab('admin-dashboard')">
        <span>📊</span> Hotel Operations Desk
      </li>
      <li class="nav-link" onclick="openArchitectureModal()">
        <span>📐</span> Project Architecture
      </li>
    </ul>

    <div class="nav-actions">
      <!-- Role Switcher -->
      <div class="role-badge ${currentRoleInfo.badgeClass}" onclick="cycleRole()" title="Click to cycle role between Guest, Staff, and Admin">
        <span>${currentRoleInfo.icon}</span>
        <span>${currentRoleInfo.text}</span>
        <span style="font-size: 0.7rem; opacity: 0.7;">(Change)</span>
      </div>

      <button class="btn btn-primary btn-sm" onclick="switchTab('explore')">
        Book Now
      </button>
    </div>
  `;
}

function renderRoleBanner() {
  const banner = document.getElementById('role-indicator-banner');
  if (!banner) return;

  const messages = {
    guest: `<strong>Guest View Mode:</strong> Browse luxurious rooms, check real-time availability, make instant bookings, and view digital vouchers.`,
    staff: `<strong>Staff / Front Desk Mode:</strong> Check guests in and out, track room cleaning & turnover, and review reservation requests.`,
    admin: `<strong>Admin Executive Mode:</strong> Full management control over revenue metrics, occupancy rate, room rates, and system reporting.`
  };

  banner.innerHTML = `
    <div style="background: #1e293b; color: #f8fafc; padding: 0.5rem 1.5rem; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155;">
      <div>${messages[state.currentRole]}</div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-sm btn-outline" style="color: white; border-color: #475569; padding: 0.2rem 0.6rem; font-size: 0.75rem;" onclick="setRole('guest')">Guest</button>
        <button class="btn btn-sm btn-outline" style="color: white; border-color: #475569; padding: 0.2rem 0.6rem; font-size: 0.75rem;" onclick="setRole('staff')">Front Desk</button>
        <button class="btn btn-sm btn-outline" style="color: white; border-color: #475569; padding: 0.2rem 0.6rem; font-size: 0.75rem;" onclick="setRole('admin')">Admin</button>
      </div>
    </div>
  `;
}

function setRole(role) {
  state.currentRole = role;
  if (role === 'admin' || role === 'staff') {
    state.activeTab = 'admin-dashboard';
  } else {
    state.activeTab = 'explore';
  }
  persistData();
  renderApp();
  showToast(`Switched active persona to ${role.toUpperCase()} mode!`, 'info');
}

function cycleRole() {
  const roles = ['guest', 'staff', 'admin'];
  const nextIdx = (roles.indexOf(state.currentRole) + 1) % roles.length;
  setRole(roles[nextIdx]);
}

function switchTab(tab) {
  state.activeTab = tab;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Room Cards & Filtering
function renderRooms() {
  const grid = document.getElementById('room-grid');
  if (!grid) return;

  // Filter logic
  let filtered = state.rooms.filter(room => {
    // Category filter
    if (state.filterCategory !== 'All' && room.category !== state.filterCategory) {
      return false;
    }
    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const match = room.title.toLowerCase().includes(q) ||
                    room.roomNumber.toLowerCase().includes(q) ||
                    room.category.toLowerCase().includes(q) ||
                    room.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Price filter
    if (room.price > state.maxPrice) return false;

    return true;
  });

  // Sort logic
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
        <h3 style="margin-bottom: 0.5rem;">No suites found matching your search</h3>
        <p style="margin-bottom: 1.5rem;">Try adjusting your filters or price slider to see more available options.</p>
        <button class="btn btn-outline" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(room => {
    const isAvailable = room.status === 'available';
    const statusText = room.status.charAt(0).toUpperCase() + room.status.slice(1);
    const statusClass = `status-${room.status}`;

    return `
      <div class="room-card">
        <div class="room-media">
          <img src="${room.image}" alt="${room.title}" loading="lazy" />
          <div class="room-badge">${room.category} • Rm ${room.roomNumber}</div>
          <div class="room-status ${statusClass}">${statusText}</div>
        </div>

        <div class="room-content">
          <div class="room-header">
            <h3 class="room-title">${room.title}</h3>
            <div class="room-rating">
              <span>★</span>
              <span>${room.rating}</span>
              <span style="color: var(--text-light); font-weight: 400; font-size: 0.75rem;">(${room.reviewsCount})</span>
            </div>
          </div>

          <p class="room-desc">${room.description}</p>

          <div class="room-features">
            <span class="feature-tag">🛏️ ${room.beds}</span>
            <span class="feature-tag">👥 Up to ${room.capacity} Guests</span>
            <span class="feature-tag">📐 ${room.size}</span>
            ${room.amenities.slice(0, 2).map(a => `<span class="feature-tag">✓ ${a}</span>`).join('')}
          </div>

          <div class="room-footer">
            <div class="room-price">
              <span class="price-val">$${room.price}</span>
              <span class="price-sub">per night + taxes</span>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline btn-sm" onclick="openRoomDetailsModal('${room.id}')">Details</button>
              ${isAvailable 
                ? `<button class="btn btn-accent btn-sm" onclick="initiateBooking('${room.id}')">Reserve</button>`
                : `<button class="btn btn-outline btn-sm" disabled style="opacity: 0.6; cursor: not-allowed;">${statusText}</button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Room Details Modal
function openRoomDetailsModal(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  const modal = document.getElementById('room-details-modal');
  const content = document.getElementById('room-details-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="position: relative; height: 320px; border-radius: var(--radius-md) var(--radius-md) 0 0; overflow: hidden; margin: -2rem -2rem 1.5rem -2rem;">
      <img src="${room.image}" alt="${room.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      <div style="position: absolute; bottom: 1rem; left: 1.5rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 0.5rem 1rem; border-radius: var(--radius-sm); color: white;">
        <span style="font-size: 1.2rem; font-weight: 800;">$${room.price}</span> / night
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h2 style="font-size: 1.6rem; margin-bottom: 0.25rem;">${room.title}</h2>
        <p style="font-size: 0.9rem; color: var(--text-muted);">Suite Room #${room.roomNumber} • ${room.category} Tier</p>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 1.2rem; color: #d97706; font-weight: 800;">★ ${room.rating} / 5.0</div>
        <div style="font-size: 0.8rem; color: var(--text-light);">${room.reviewsCount} verified guest reviews</div>
      </div>
    </div>

    <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-main); margin-bottom: 1.5rem;">
      ${room.description}
    </p>

    <h4 style="font-size: 1rem; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
      Suite Specifications
    </h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
      <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm);">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Bed Configuration</span>
        <strong>${room.beds}</strong>
      </div>
      <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm);">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Max Guests</span>
        <strong>${room.capacity} Adults</strong>
      </div>
      <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm);">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Floor Space</span>
        <strong>${room.size}</strong>
      </div>
      <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm);">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Availability</span>
        <strong style="text-transform: capitalize; color: ${room.status === 'available' ? 'var(--success)' : 'var(--danger)'};">${room.status}</strong>
      </div>
    </div>

    <h4 style="font-size: 1rem; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
      Exclusive Amenities
    </h4>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; margin-bottom: 1.5rem;">
      ${room.amenities.map(a => `
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
          <span style="color: var(--success); font-weight: bold;">✓</span>
          <span>${a}</span>
        </div>
      `).join('')}
    </div>

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #166534; margin-bottom: 1.5rem;">
      <strong>HotelPro Guarantee:</strong> Complimentary high-speed Wi-Fi, 24/7 concierge assistance, and free cancellation up to 24 hours prior to check-in.
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
      <button class="btn btn-outline" onclick="closeModal('room-details-modal')">Close</button>
      ${room.status === 'available' 
        ? `<button class="btn btn-accent" onclick="closeModal('room-details-modal'); initiateBooking('${room.id}');">Proceed to Reservation</button>`
        : `<button class="btn btn-outline" disabled style="opacity: 0.6;">Room Currently ${room.status}</button>`
      }
    </div>
  `;

  modal.classList.add('active');
}

// Booking Flow & Calculation
function initiateBooking(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  state.selectedRoomForBooking = room;
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  // Sync dates from search bar if available
  const searchCheckIn = document.getElementById('search-checkin')?.value;
  const searchCheckOut = document.getElementById('search-checkout')?.value;
  const searchGuests = document.getElementById('search-guests')?.value;

  document.getElementById('book-room-title').textContent = room.title;
  document.getElementById('book-room-meta').textContent = `Room ${room.roomNumber} • $${room.price}/night`;
  document.getElementById('book-guest-name').value = state.currentUser.name;
  document.getElementById('book-guest-email').value = state.currentUser.email;
  document.getElementById('book-guest-phone').value = state.currentUser.phone;

  if (searchCheckIn) document.getElementById('book-checkin').value = searchCheckIn;
  if (searchCheckOut) document.getElementById('book-checkout').value = searchCheckOut;
  if (searchGuests) document.getElementById('book-guests').value = searchGuests;

  recalculateBookingSummary();
  modal.classList.add('active');
}

function recalculateBookingSummary() {
  if (!state.selectedRoomForBooking) return;

  const room = state.selectedRoomForBooking;
  const checkInVal = document.getElementById('book-checkin').value;
  const checkOutVal = document.getElementById('book-checkout').value;

  if (!checkInVal || !checkOutVal) return;

  const checkIn = new Date(checkInVal);
  const checkOut = new Date(checkOutVal);

  const diffTime = checkOut.getTime() - checkIn.getTime();
  let nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (nights <= 0) nights = 1;

  const subtotal = nights * room.price;
  const taxes = Number((subtotal * 0.12).toFixed(2));
  const total = Number((subtotal + taxes).toFixed(2));

  document.getElementById('summary-nights').textContent = `${nights} night${nights > 1 ? 's' : ''}`;
  document.getElementById('summary-rate').textContent = `$${room.price} x ${nights}`;
  document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('summary-taxes').textContent = `$${taxes.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

// Booking Form Submit (Generates Booking + JWT Simulation + Invoice)
function handleBookingSubmit(e) {
  e.preventDefault();

  if (!state.selectedRoomForBooking) return;

  const room = state.selectedRoomForBooking;
  const checkIn = document.getElementById('book-checkin').value;
  const checkOut = document.getElementById('book-checkout').value;
  const guestName = document.getElementById('book-guest-name').value;
  const guestEmail = document.getElementById('book-guest-email').value;
  const guestPhone = document.getElementById('book-guest-phone').value;
  const guestsCount = parseInt(document.getElementById('book-guests').value, 10);
  const requests = document.getElementById('book-requests').value || "None";
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "Credit Card (Instant)";

  const nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
  const subtotal = nights * room.price;
  const taxes = Number((subtotal * 0.12).toFixed(2));
  const totalAmount = Number((subtotal + taxes).toFixed(2));

  // Generate Booking Record
  const newBookingId = `HP-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = {
    id: newBookingId,
    roomId: room.id,
    roomNumber: room.roomNumber,
    roomTitle: room.title,
    guestName,
    guestEmail,
    guestPhone,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    nights,
    guestsCount,
    ratePerNight: room.price,
    taxes,
    totalAmount,
    paymentMethod,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
    specialRequests: requests,
    bookedAt: new Date().toISOString().split('T')[0]
  };

  // Update room status to reserved
  room.status = 'reserved';

  // Prepend new booking
  state.bookings.unshift(newBooking);

  persistData();
  closeModal('booking-modal');
  renderApp();

  showToast(`Reservation #${newBookingId} Confirmed! Payment processed successfully.`, 'success');

  // Open the printable voucher
  openInvoiceModal(newBookingId);
}

// Digital Invoice / Voucher Modal
function openInvoiceModal(bookingId) {
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const modal = document.getElementById('voucher-modal');
  const container = document.getElementById('voucher-content');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="voucher-box" id="printable-voucher">
      <div class="voucher-header">
        <div style="font-size: 2rem;">🏨</div>
        <h2 style="font-size: 1.8rem; margin: 0.25rem 0;">HotelPro International</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Official Booking Confirmation & Digital Check-In Pass</p>
        <div class="voucher-badge">CONFIRMED &amp; PAID</div>
      </div>

      <div class="voucher-details">
        <div class="v-item">
          <span class="v-label">Booking Reference</span>
          <span class="v-val" style="color: var(--primary); font-size: 1.1rem; font-family: monospace;">#${booking.id}</span>
        </div>
        <div class="v-item">
          <span class="v-label">Guest Full Name</span>
          <span class="v-val">${booking.guestName}</span>
        </div>
        <div class="v-item">
          <span class="v-label">Reserved Suite</span>
          <span class="v-val">${booking.roomTitle} (Room ${booking.roomNumber})</span>
        </div>
        <div class="v-item">
          <span class="v-label">Guests Count</span>
          <span class="v-val">${booking.guestsCount} Guest(s)</span>
        </div>
        <div class="v-item">
          <span class="v-label">Check-in Date</span>
          <span class="v-val">${booking.checkInDate} (From 2:00 PM)</span>
        </div>
        <div class="v-item">
          <span class="v-label">Check-out Date</span>
          <span class="v-val">${booking.checkOutDate} (By 11:00 AM)</span>
        </div>
        <div class="v-item">
          <span class="v-label">Duration</span>
          <span class="v-val">${booking.nights} Night(s)</span>
        </div>
        <div class="v-item">
          <span class="v-label">Total Amount Paid</span>
          <span class="v-val" style="color: var(--success); font-size: 1.1rem;">$${booking.totalAmount.toFixed(2)} USD</span>
        </div>
      </div>

      <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; font-size: 0.85rem;">
        <strong>Special Requests / Instructions:</strong>
        <p style="margin-top: 0.25rem; color: var(--text-muted);">${booking.specialRequests || 'Standard hospitality service requested.'}</p>
      </div>

      <div class="voucher-qr">
        <div class="qr-placeholder">
          [QR PASS]<br/>HP-${booking.id}
        </div>
        <div style="text-align: left;">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.25rem;">Contactless Front Desk Check-in</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted);">
            Scan this QR code upon arrival at the HotelPro kiosk or present this digital pass to the concierge for instant suite key card issuance.
          </p>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;" class="no-print">
      <button class="btn btn-outline" onclick="closeModal('voucher-modal')">Close</button>
      <button class="btn btn-primary" onclick="window.print()">
        <span>🖨️</span> Print Voucher
      </button>
    </div>
  `;

  modal.classList.add('active');
}

// Guest Bookings Portal
function renderMyBookings() {
  const container = document.getElementById('my-bookings-container');
  if (!container) return;

  // Filter bookings for current active user or all guest bookings
  const guestBookings = state.bookings;

  if (guestBookings.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🧳</div>
        <h3>No reservations found</h3>
        <p style="margin-bottom: 1.5rem;">You do not have any active or past hotel bookings yet.</p>
        <button class="btn btn-primary" onclick="switchTab('explore')">Explore &amp; Book Suites</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">My Hotel Reservations</h2>
        <p class="section-subtitle">Manage upcoming trips, view digital confirmation passes, or cancel bookings.</p>
      </div>
      <button class="btn btn-outline btn-sm" onclick="switchTab('explore')">+ Book Another Room</button>
    </div>

    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Suite / Room</th>
            <th>Check-in & Check-out</th>
            <th>Nights</th>
            <th>Total Paid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${guestBookings.map(b => {
            let statusBadge = '<span class="room-status status-available">Confirmed</span>';
            if (b.bookingStatus === 'checked-in') statusBadge = '<span class="room-status status-occupied">Checked In</span>';
            if (b.bookingStatus === 'checked-out') statusBadge = '<span class="room-status status-maintenance">Completed</span>';
            if (b.bookingStatus === 'cancelled') statusBadge = '<span class="room-status" style="background: #fee2e2; color: #dc2626;">Cancelled</span>';

            return `
              <tr>
                <td><strong>#${b.id}</strong></td>
                <td>
                  <strong>${b.roomTitle}</strong><br/>
                  <small style="color: var(--text-muted);">Room ${b.roomNumber}</small>
                </td>
                <td>
                  <div>${b.checkInDate}</div>
                  <small style="color: var(--text-muted);">to ${b.checkOutDate}</small>
                </td>
                <td>${b.nights}</td>
                <td><strong>$${b.totalAmount.toFixed(2)}</strong></td>
                <td>${statusBadge}</td>
                <td>
                  <div style="display: flex; gap: 0.4rem;">
                    <button class="btn btn-outline btn-sm" onclick="openInvoiceModal('${b.id}')">Voucher</button>
                    ${b.bookingStatus === 'confirmed' 
                      ? `<button class="btn btn-danger btn-sm" onclick="cancelBooking('${b.id}')">Cancel</button>` 
                      : ''
                    }
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function cancelBooking(bookingId) {
  if (!confirm(`Are you sure you want to cancel reservation #${bookingId}? A full refund will be initiated.`)) return;

  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  booking.bookingStatus = 'cancelled';
  
  // Free the room back up
  const room = state.rooms.find(r => r.id === booking.roomId);
  if (room && room.status === 'reserved') {
    room.status = 'available';
  }

  persistData();
  renderApp();
  showToast(`Booking #${bookingId} has been successfully cancelled and refunded.`, 'warning');
}

// Admin & Staff Operations Dashboard
function renderAdminDashboard() {
  const container = document.getElementById('admin-dashboard-container');
  if (!container) return;

  // Compute Metrics
  const totalRevenue = state.bookings
    .filter(b => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const totalRooms = state.rooms.length;
  const occupiedRooms = state.rooms.filter(r => r.status === 'occupied').length;
  const reservedRooms = state.rooms.filter(r => r.status === 'reserved').length;
  const availableRooms = state.rooms.filter(r => r.status === 'available').length;
  const occupancyRate = Math.round(((occupiedRooms + reservedRooms) / totalRooms) * 100);

  const activeCheckIns = state.bookings.filter(b => b.bookingStatus === 'checked-in').length;
  const pendingArrivals = state.bookings.filter(b => b.bookingStatus === 'confirmed').length;

  container.innerHTML = `
    <div class="admin-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Hotel Operations Command Center</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Real-time hospitality management, room turnover, check-in desk & financials.</p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn btn-outline btn-sm" onclick="exportBookingsCSV()">
            <span>📥</span> Export Bookings CSV
          </button>
          <button class="btn btn-primary btn-sm" onclick="openAddRoomModal()">
            <span>➕</span> Add New Suite
          </button>
        </div>
      </div>

      <!-- KPI Metrics -->
      <div class="kpi-grid">
        <div class="kpi-card gold">
          <div class="kpi-title">Total Revenue</div>
          <div class="kpi-value">$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="kpi-sub">▲ 18.4% vs last period</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-title">Occupancy Rate</div>
          <div class="kpi-value">${occupancyRate}%</div>
          <div class="kpi-sub" style="color: var(--primary);">${occupiedRooms + reservedRooms} of ${totalRooms} Rooms Booked</div>
        </div>

        <div class="kpi-card green">
          <div class="kpi-title">Active In-House Guests</div>
          <div class="kpi-value">${activeCheckIns}</div>
          <div class="kpi-sub">Checked In &amp; In-Suite</div>
        </div>

        <div class="kpi-card cyan">
          <div class="kpi-title">Expected Arrivals</div>
          <div class="kpi-value">${pendingArrivals}</div>
          <div class="kpi-sub" style="color: var(--info);">Ready for Check-In Desk</div>
        </div>
      </div>

      <!-- Real-Time Room Matrix Grid -->
      <div class="matrix-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.2rem;">Live Floor Inventory Matrix</h3>
          <div style="display: flex; gap: 1rem; font-size: 0.75rem;">
            <span><strong style="color: #15803d;">●</strong> Available (${availableRooms})</span>
            <span><strong style="color: #b91c1c;">●</strong> Occupied (${occupiedRooms})</span>
            <span><strong style="color: #b45309;">●</strong> Reserved (${reservedRooms})</span>
            <span><strong style="color: #475569;">●</strong> Turnover / Maint</span>
          </div>
        </div>

        <div class="room-matrix-grid">
          ${state.rooms.map(room => {
            const statusClass = `status-${room.status}`;
            return `
              <div class="matrix-room-cell ${statusClass}" onclick="toggleRoomStatusQuick('${room.id}')" title="Click to toggle status (Available -> Occupied -> Maintenance)">
                <div class="matrix-room-num">#${room.roomNumber}</div>
                <div class="matrix-room-type">${room.category}</div>
                <span class="matrix-room-badge">${room.status}</span>
                <div style="font-size: 0.75rem; margin-top: 0.35rem; font-weight: 700; color: var(--primary-dark);">$${room.price}/n</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Front Desk & Bookings Management Table -->
      <div style="margin-top: 2.5rem;">
        <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">Front Desk Guest Ledger &amp; Check-In Operations</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Booking #</th>
                <th>Guest Information</th>
                <th>Room / Suite</th>
                <th>Stay Dates</th>
                <th>Status</th>
                <th>Front Desk Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.bookings.map(b => {
                let statusBadge = '<span class="room-status status-available">Confirmed</span>';
                if (b.bookingStatus === 'checked-in') statusBadge = '<span class="room-status status-occupied">In-House</span>';
                if (b.bookingStatus === 'checked-out') statusBadge = '<span class="room-status status-maintenance">Checked Out</span>';
                if (b.bookingStatus === 'cancelled') statusBadge = '<span class="room-status" style="background:#fee2e2; color:#dc2626;">Cancelled</span>';

                return `
                  <tr>
                    <td><strong>#${b.id}</strong></td>
                    <td>
                      <strong>${b.guestName}</strong><br/>
                      <small style="color: var(--text-muted);">${b.guestPhone} • ${b.guestEmail}</small>
                    </td>
                    <td>
                      <strong>Room ${b.roomNumber}</strong><br/>
                      <small style="color: var(--text-muted);">${b.roomTitle}</small>
                    </td>
                    <td>
                      ${b.checkInDate} &rarr; ${b.checkOutDate}<br/>
                      <small style="color: var(--text-muted);">${b.nights} Night(s) • Total: $${b.totalAmount.toFixed(2)}</small>
                    </td>
                    <td>${statusBadge}</td>
                    <td>
                      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                        ${b.bookingStatus === 'confirmed' ? `
                          <button class="btn btn-success btn-sm" onclick="performCheckIn('${b.id}')">🛎️ Check In</button>
                        ` : ''}
                        ${b.bookingStatus === 'checked-in' ? `
                          <button class="btn btn-primary btn-sm" onclick="performCheckOut('${b.id}')">🚪 Check Out</button>
                        ` : ''}
                        <button class="btn btn-outline btn-sm" onclick="openInvoiceModal('${b.id}')">Folio</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Front Desk Actions
function performCheckIn(bookingId) {
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  booking.bookingStatus = 'checked-in';
  
  // Update Room to Occupied
  const room = state.rooms.find(r => r.id === booking.roomId);
  if (room) {
    room.status = 'occupied';
  }

  persistData();
  renderApp();
  showToast(`Guest ${booking.guestName} has been Checked In to Room #${booking.roomNumber}!`, 'success');
}

function performCheckOut(bookingId) {
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  booking.bookingStatus = 'checked-out';
  
  // Set room to maintenance / housekeeping
  const room = state.rooms.find(r => r.id === booking.roomId);
  if (room) {
    room.status = 'available';
  }

  persistData();
  renderApp();
  showToast(`Guest ${booking.guestName} Checked Out. Room #${booking.roomNumber} is now freed and set to turnover!`, 'info');
}

function toggleRoomStatusQuick(roomId) {
  const room = state.rooms.find(r => r.id === roomId);
  if (!room) return;

  const cycle = {
    'available': 'occupied',
    'occupied': 'maintenance',
    'maintenance': 'available',
    'reserved': 'occupied'
  };

  room.status = cycle[room.status] || 'available';
  persistData();
  renderApp();
  showToast(`Room #${room.roomNumber} status changed to ${room.status.toUpperCase()}`, 'info');
}

// Add Room Modal & Handler
function openAddRoomModal() {
  const modal = document.getElementById('add-room-modal');
  if (modal) modal.classList.add('active');
}

function handleAddRoomSubmit(e) {
  e.preventDefault();
  
  const roomNumber = document.getElementById('new-room-num').value;
  const title = document.getElementById('new-room-title').value;
  const category = document.getElementById('new-room-cat').value;
  const price = parseFloat(document.getElementById('new-room-price').value);
  const capacity = parseInt(document.getElementById('new-room-capacity').value, 10);
  const beds = document.getElementById('new-room-beds').value;
  const image = document.getElementById('new-room-img').value || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80";
  const desc = document.getElementById('new-room-desc').value;

  const newRoom = {
    id: `rm-${Date.now()}`,
    roomNumber,
    title,
    category,
    price,
    capacity,
    beds,
    size: "450 sq ft",
    status: "available",
    rating: 4.8,
    reviewsCount: 1,
    image,
    amenities: ["Free Wi-Fi", "Air Conditioning", "En-suite Bath", "Smart TV"],
    description: desc
  };

  state.rooms.unshift(newRoom);
  persistData();
  closeModal('add-room-modal');
  renderApp();
  showToast(`Suite #${roomNumber} (${title}) added successfully to inventory!`, 'success');
}

// Export Bookings to CSV
function exportBookingsCSV() {
  let csv = "BookingID,GuestName,Email,Phone,RoomNumber,SuiteTitle,CheckIn,CheckOut,Nights,TotalAmount,Status\n";
  
  state.bookings.forEach(b => {
    csv += `"${b.id}","${b.guestName}","${b.guestEmail}","${b.guestPhone}","${b.roomNumber}","${b.roomTitle}","${b.checkInDate}","${b.checkOutDate}",${b.nights},${b.totalAmount},"${b.bookingStatus}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `hotelpro_bookings_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Bookings report downloaded as CSV file!", "success");
}

// Architecture & SkillWallet Epics Modal
function openArchitectureModal() {
  const modal = document.getElementById('architecture-modal');
  if (modal) modal.classList.add('active');
}

// Modal helper
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

// Toast System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'danger') icon = '⚠️';
  if (type === 'warning') icon = '🔔';

  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icon}</span>
    <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Event Listeners Setup
function setupEventListeners() {
  // Category Pills
  const pills = document.querySelectorAll('.category-pills .pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      state.filterCategory = e.target.getAttribute('data-cat') || 'All';
      renderRooms();
    });
  });

  // Search input
  const searchInput = document.getElementById('room-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderRooms();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('room-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderRooms();
    });
  }

  // Price slider
  const priceSlider = document.getElementById('price-range-slider');
  const priceValDisplay = document.getElementById('price-range-val');
  if (priceSlider && priceValDisplay) {
    priceSlider.addEventListener('input', (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      priceValDisplay.textContent = `$${state.maxPrice}`;
      renderRooms();
    });
  }

  // Hero Search Button
  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const typeSelect = document.getElementById('search-room-type');
      if (typeSelect && typeSelect.value !== 'all') {
        state.filterCategory = typeSelect.value;
        // update pills
        document.querySelectorAll('.category-pills .pill-btn').forEach(p => {
          if (p.getAttribute('data-cat') === typeSelect.value) p.classList.add('active');
          else p.classList.remove('active');
        });
      }
      renderRooms();
      document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Date recalculation in booking modal
  document.getElementById('book-checkin')?.addEventListener('change', recalculateBookingSummary);
  document.getElementById('book-checkout')?.addEventListener('change', recalculateBookingSummary);

  // Forms
  document.getElementById('booking-form')?.addEventListener('submit', handleBookingSubmit);
  document.getElementById('add-room-form')?.addEventListener('submit', handleAddRoomSubmit);

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

function resetFilters() {
  state.filterCategory = 'All';
  state.searchQuery = '';
  state.maxPrice = 800;
  state.sortBy = 'featured';

  const searchInput = document.getElementById('room-search-input');
  if (searchInput) searchInput.value = '';

  const priceSlider = document.getElementById('price-range-slider');
  const priceValDisplay = document.getElementById('price-range-val');
  if (priceSlider && priceValDisplay) {
    priceSlider.value = 800;
    priceValDisplay.textContent = '$800';
  }

  document.querySelectorAll('.category-pills .pill-btn').forEach((p, idx) => {
    if (idx === 0) p.classList.add('active');
    else p.classList.remove('active');
  });

  renderRooms();
}
