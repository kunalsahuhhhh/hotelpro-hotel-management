import React, { useState } from 'react';

export default function BookingModal({ room, onClose, onConfirm }) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [guestName, setGuestName] = useState('Alexander Wright');
  const [guestEmail, setGuestEmail] = useState('guest@example.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-5678');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Instant)');

  const nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
  const subtotal = nights * room.price;
  const taxes = Number((subtotal * 0.12).toFixed(2));
  const totalAmount = Number((subtotal + taxes).toFixed(2));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      id: `HP-${Math.floor(1000 + Math.random() * 9000)}`,
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
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      specialRequests: specialRequests || 'Standard guest service',
      bookedAt: today
    };

    onConfirm(newBooking);
  };

  return (
    <div className="modal-overlay active">
      <div className="modal-card" style={{ maxWidth: '750px' }}>
        <div className="modal-header">
          <div>
            <h3>Confirm Suite Reservation</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
              {room.title} (Room {room.roomNumber})
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Guest Information
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input 
                    type="text" 
                    placeholder="Guest Name" 
                    value={guestName} 
                    onChange={e => setGuestName(e.target.value)} 
                    required 
                    style={{ padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} 
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={guestEmail} 
                    onChange={e => setGuestEmail(e.target.value)} 
                    required 
                    style={{ padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} 
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    value={guestPhone} 
                    onChange={e => setGuestPhone(e.target.value)} 
                    required 
                    style={{ padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} 
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input 
                      type="date" 
                      value={checkIn} 
                      onChange={e => setCheckIn(e.target.value)} 
                      required 
                      style={{ padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} 
                    />
                    <input 
                      type="date" 
                      value={checkOut} 
                      onChange={e => setCheckOut(e.target.value)} 
                      required 
                      style={{ padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Special requests (e.g. Airport shuttle)" 
                    value={specialRequests} 
                    onChange={e => setSpecialRequests(e.target.value)} 
                    style={{ padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} 
                  />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Order Summary
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Rate</span>
                    <span>${room.price} / night</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Nights</span>
                    <span>{nights} night(s)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Taxes &amp; Fees (12%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <span>Total Due</span>
                    <span style={{ color: 'var(--primary)' }}>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn-accent" style={{ width: '100%', padding: '0.8rem' }}>
                    Confirm &amp; Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
