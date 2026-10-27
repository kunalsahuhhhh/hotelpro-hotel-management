import React, { useState } from 'react';

export default function Hero({ onSearch }) {
  const [category, setCategory] = useState('all');

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-pill">
          <span>👑</span> 5-Star Luxury Experience &amp; Modern Hospitality Engine
        </div>
        <h1 className="hero-title">
          The Future of <span>Hotel Booking</span> &amp; Seamless Management
        </h1>
        <p className="hero-subtitle">
          Real-time suite availability, instant contactless guest passes, automated front desk check-in, and intelligent room inventory.
        </p>
      </div>

      <div className="search-widget" style={{ maxWidth: '1000px', margin: '2rem auto -5rem auto' }}>
        <div className="search-grid">
          <div className="search-field">
            <label>📅 Check-In Date</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="search-field">
            <label>📅 Check-Out Date</label>
            <input type="date" />
          </div>
          <div className="search-field">
            <label>🏨 Suite Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Suites</option>
              <option value="Suites">Suites</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Villas">Villas</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <button 
            className="btn btn-accent" 
            style={{ height: '48px' }}
            onClick={() => onSearch(category)}
          >
            Find Suites
          </button>
        </div>
      </div>
    </section>
  );
}
