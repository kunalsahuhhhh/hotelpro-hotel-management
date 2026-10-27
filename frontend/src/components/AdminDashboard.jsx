import React from 'react';

export default function AdminDashboard({ rooms, bookings, onCheckIn, onCheckOut, onOpenVoucher }) {
  const totalRev = bookings.filter(b => b.bookingStatus !== 'cancelled').reduce((acc, b) => acc + b.totalAmount, 0);
  const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
  const reservedCount = rooms.filter(r => r.status === 'reserved').length;
  const occupancyRate = rooms.length > 0 ? Math.round(((occupiedCount + reservedCount) / rooms.length) * 100) : 0;

  return (
    <div className="section">
      <div className="admin-view">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>Hotel Operations Command Center</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Front desk check-in / check-out, room inventory matrix, and revenue oversight.</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card gold">
            <div className="kpi-title">Gross Revenue</div>
            <div className="kpi-value">${totalRev.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="kpi-sub">Verified Bookings</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Occupancy Rate</div>
            <div className="kpi-value">{occupancyRate}%</div>
            <div className="kpi-sub" style={{ color: 'var(--primary)' }}>{occupiedCount + reservedCount} / {rooms.length} Suites Reserved</div>
          </div>
          <div className="kpi-card green">
            <div className="kpi-title">In-House Guests</div>
            <div className="kpi-value">{occupiedCount}</div>
            <div className="kpi-sub">Checked In</div>
          </div>
          <div className="kpi-card cyan">
            <div className="kpi-title">Pending Arrivals</div>
            <div className="kpi-value">{reservedCount}</div>
            <div className="kpi-sub">Awaiting Check-in Desk</div>
          </div>
        </div>

        {/* Floor Matrix Grid */}
        <div className="matrix-container">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Room Inventory Matrix</h3>
          <div className="room-matrix-grid">
            {rooms.map(room => (
              <div key={room.id} className={`matrix-room-cell status-${room.status}`}>
                <div className="matrix-room-num">#{room.roomNumber}</div>
                <div className="matrix-room-type">{room.category}</div>
                <span className="matrix-room-badge">{room.status}</span>
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 'bold' }}>${room.price}/n</div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Ledger */}
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Front Desk Operations Ledger</h3>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Name</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td><strong>#{b.id}</strong></td>
                    <td>{b.guestName}</td>
                    <td>Room {b.roomNumber} ({b.roomTitle})</td>
                    <td>{b.checkInDate} &rarr; {b.checkOutDate}</td>
                    <td>
                      <span className={`room-status status-${b.bookingStatus === 'checked-in' ? 'occupied' : 'available'}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {b.bookingStatus === 'confirmed' && (
                          <button className="btn btn-success btn-sm" onClick={() => onCheckIn(b.id)}>
                            Check In
                          </button>
                        )}
                        {b.bookingStatus === 'checked-in' && (
                          <button className="btn btn-primary btn-sm" onClick={() => onCheckOut(b.id)}>
                            Check Out
                          </button>
                        )}
                        <button className="btn btn-outline btn-sm" onClick={() => onOpenVoucher(b.id)}>
                          Folio
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
