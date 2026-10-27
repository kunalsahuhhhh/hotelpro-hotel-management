import React from 'react';

export default function Navbar({ role, activeTab, setActiveTab, onCycleRole }) {
  const roleDisplay = {
    guest: { text: 'Guest Experience', icon: '👤', cls: 'role-guest' },
    staff: { text: 'Front Desk Staff', icon: '🛎️', cls: 'role-staff' },
    admin: { text: 'General Manager (Admin)', icon: '👑', cls: 'role-admin' }
  }[role] || { text: 'Guest', icon: '👤', cls: 'role-guest' };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => setActiveTab('explore')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon">🏨</div>
        <div>Hotel<span>Pro</span></div>
      </div>

      <ul className="nav-links">
        <li 
          className={`nav-link ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('explore')}
        >
          <span>✨</span> Explore Suites
        </li>
        <li 
          className={`nav-link ${activeTab === 'my-bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-bookings')}
        >
          <span>📑</span> My Bookings
        </li>
        <li 
          className={`nav-link ${activeTab === 'admin-dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin-dashboard')}
        >
          <span>📊</span> Hotel Operations
        </li>
      </ul>

      <div className="nav-actions">
        <div className={`role-badge ${roleDisplay.cls}`} onClick={onCycleRole}>
          <span>{roleDisplay.icon}</span>
          <span>{roleDisplay.text}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>(Switch)</span>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('explore')}>
          Book Now
        </button>
      </div>
    </nav>
  );
}
