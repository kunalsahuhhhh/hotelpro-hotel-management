import React from 'react';

export default function InvoiceModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal-card" style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <h3>Reservation Pass &amp; Receipt</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="voucher-box">
            <div className="voucher-header">
              <div style={{ fontSize: '2rem' }}>🏨</div>
              <h2 style={{ fontSize: '1.6rem', margin: '0.2rem 0' }}>HotelPro Luxury Resorts</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Official Guest Confirmation Pass</p>
              <div className="voucher-badge">CONFIRMED &amp; PAID</div>
            </div>

            <div className="voucher-details">
              <div className="v-item">
                <span className="v-label">Booking ID</span>
                <span className="v-val" style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>#{booking.id}</span>
              </div>
              <div className="v-item">
                <span className="v-label">Guest</span>
                <span className="v-val">{booking.guestName}</span>
              </div>
              <div className="v-item">
                <span className="v-label">Suite</span>
                <span className="v-val">{booking.roomTitle} (Rm {booking.roomNumber})</span>
              </div>
              <div className="v-item">
                <span className="v-label">Total Paid</span>
                <span className="v-val" style={{ color: 'var(--success)' }}>${booking.totalAmount.toFixed(2)}</span>
              </div>
              <div className="v-item">
                <span className="v-label">Check-in</span>
                <span className="v-val">{booking.checkInDate}</span>
              </div>
              <div className="v-item">
                <span className="v-label">Check-out</span>
                <span className="v-val">{booking.checkOutDate}</span>
              </div>
            </div>

            <div className="voucher-qr">
              <div className="qr-placeholder">
                [QR PASS]<br/>HP-{booking.id}
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Contactless Check-in Enabled</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Present this voucher or scan this QR pass at the HotelPro reception desk to receive your suite smart key.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button className="btn btn-outline" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={() => window.print()}>
              <span>🖨️</span> Print Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
