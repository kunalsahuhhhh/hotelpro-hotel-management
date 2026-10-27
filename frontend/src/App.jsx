import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import BookingModal from './components/BookingModal';
import InvoiceModal from './components/InvoiceModal';
import AdminDashboard from './components/AdminDashboard';
import GuestPortal from './components/GuestPortal';

export default function App() {
  const [role, setRole] = useState(localStorage.getItem('hotelpro_role') || 'guest');
  const [activeTab, setActiveTab] = useState('explore');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeVoucherId, setActiveVoucherId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    // Initial fetch from API or fallback to localStorage seed
    const cachedRooms = localStorage.getItem('hotelpro_rooms');
    if (cachedRooms) {
      setRooms(JSON.parse(cachedRooms));
    }
    const cachedBookings = localStorage.getItem('hotelpro_bookings');
    if (cachedBookings) {
      setBookings(JSON.parse(cachedBookings));
    }
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem('hotelpro_role', newRole);
    if (newRole === 'admin' || newRole === 'staff') {
      setActiveTab('admin-dashboard');
    } else {
      setActiveTab('explore');
    }
  };

  const handleBookingConfirmed = (newBooking) => {
    setBookings([newBooking, ...bookings]);
    setRooms(rooms.map(r => r.id === newBooking.roomId ? { ...r, status: 'reserved' } : r));
    setSelectedRoom(null);
    setActiveVoucherId(newBooking.id);
  };

  const handleCheckIn = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, bookingStatus: 'checked-in' };
      }
      return b;
    }));
  };

  const handleCheckOut = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, bookingStatus: 'checked-out' };
      }
      return b;
    }));
  };

  // Filtered rooms
  const filteredRooms = rooms.filter(room => {
    if (filterCategory !== 'All' && room.category !== filterCategory) return false;
    if (room.price > maxPrice) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        room.title.toLowerCase().includes(q) ||
        room.roomNumber.toLowerCase().includes(q) ||
        room.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="hotelpro-app">
      {/* Role Banner */}
      <div style={{ background: '#1e293b', color: '#f8fafc', padding: '0.5rem 1.5rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          Current Persona: <strong style={{ textTransform: 'uppercase' }}>{role}</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-sm btn-outline" style={{ color: 'white', borderColor: '#475569', padding: '0.2rem 0.6rem' }} onClick={() => handleRoleChange('guest')}>Guest Mode</button>
          <button className="btn btn-sm btn-outline" style={{ color: 'white', borderColor: '#475569', padding: '0.2rem 0.6rem' }} onClick={() => handleRoleChange('staff')}>Front Desk</button>
          <button className="btn btn-sm btn-outline" style={{ color: 'white', borderColor: '#475569', padding: '0.2rem 0.6rem' }} onClick={() => handleRoleChange('admin')}>Admin</button>
        </div>
      </div>

      <Navbar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onCycleRole={() => handleRoleChange(role === 'guest' ? 'staff' : role === 'staff' ? 'admin' : 'guest')} 
      />

      {activeTab === 'explore' && (
        <>
          <Hero onSearch={(cat) => { setFilterCategory(cat); }} />
          
          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Handcrafted Accommodations</h2>
                <p className="section-subtitle">Real-time room availability, luxury furnishings, and direct reservations.</p>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="filter-bar">
              <div className="category-pills">
                {['All', 'Suites', 'Penthouse', 'Villas', 'Standard'].map(cat => (
                  <button 
                    key={cat} 
                    className={`pill-btn ${filterCategory === cat ? 'active' : ''}`}
                    onClick={() => setFilterCategory(cat)}
                  >
                    {cat === 'All' ? 'All Suites' : cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Search suite..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: '0.45rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </div>
            </div>

            <div className="room-grid">
              {filteredRooms.map(room => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onReserve={(rm) => setSelectedRoom(rm)} 
                />
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'my-bookings' && (
        <GuestPortal 
          bookings={bookings} 
          onOpenVoucher={(id) => setActiveVoucherId(id)} 
          onBookMore={() => setActiveTab('explore')}
        />
      )}

      {activeTab === 'admin-dashboard' && (
        <AdminDashboard 
          rooms={rooms}
          bookings={bookings}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onOpenVoucher={(id) => setActiveVoucherId(id)}
        />
      )}

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
          onConfirm={handleBookingConfirmed} 
        />
      )}

      {/* Voucher Modal */}
      {activeVoucherId && (
        <InvoiceModal 
          booking={bookings.find(b => b.id === activeVoucherId)} 
          onClose={() => setActiveVoucherId(null)} 
        />
      )}
    </div>
  );
}
