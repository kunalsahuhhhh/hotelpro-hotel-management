import React from 'react';

export default function RoomCard({ room, onReserve }) {
  const isAvailable = room.status === 'available';
  const statusClass = `status-${room.status}`;

  return (
    <div className="room-card">
      <div className="room-media">
        <img src={room.image} alt={room.title} loading="lazy" />
        <div className="room-badge">{room.category} • Rm {room.roomNumber}</div>
        <div className={`room-status ${statusClass}`}>
          {room.status.toUpperCase()}
        </div>
      </div>

      <div className="room-content">
        <div className="room-header">
          <h3 className="room-title">{room.title}</h3>
          <div className="room-rating">
            <span>★</span>
            <span>{room.rating}</span>
            <span style={{ color: 'var(--text-light)', fontWeight: 400, fontSize: '0.75rem' }}>
              ({room.reviewsCount})
            </span>
          </div>
        </div>

        <p className="room-desc">{room.description}</p>

        <div className="room-features">
          <span className="feature-tag">🛏️ {room.beds}</span>
          <span className="feature-tag">👥 Up to {room.capacity}</span>
          <span className="feature-tag">📐 {room.size}</span>
          {room.amenities.slice(0, 2).map((a, idx) => (
            <span key={idx} className="feature-tag">✓ {a}</span>
          ))}
        </div>

        <div className="room-footer">
          <div className="room-price">
            <span className="price-val">${room.price}</span>
            <span className="price-sub">per night + taxes</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isAvailable ? (
              <button className="btn btn-accent btn-sm" onClick={() => onReserve(room)}>
                Reserve
              </button>
            ) : (
              <button className="btn btn-outline btn-sm" disabled style={{ opacity: 0.6 }}>
                Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
