import React from 'react';

export default function GuestPortal({ bookings, onOpenVoucher, onBookMore }) {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">My Hotel Reservations</h2>
          <p className="section-subtitle">Manage upcoming trips and download digital confirmation passes.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={onBookMore}>+ Book Another Room</button>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Reference #</th>
              <th>Suite</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Total Paid</th>
              <th>Status</th>
              <th>Pass / Receipt</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td><strong>#{b.id}</strong></td>
                <td>
                  <strong>{b.roomTitle}</strong><br/>
                  <small style={{ color: 'var(--text-muted)' }}>Room {b.roomNumber}</small>
                </td>
                <td>{b.checkInDate} to {b.checkOutDate}</td>
                <td>{b.guestsCount} Guest(s)</td>
                <td><strong>${b.totalAmount.toFixed(2)}</strong></td>
                <td>
                  <span className={`room-status status-${b.bookingStatus === 'checked-in' ? 'occupied' : 'available'}`}>
                    {b.bookingStatus}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => onOpenVoucher(b.id)}>
                    View Voucher
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
