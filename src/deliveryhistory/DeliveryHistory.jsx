import React, { useState, useEffect } from 'react';
import './DeliveryHistory.css';

const dummyDeliveries = [
  { id: 1, customer: 'Alice Kumar', address: '123 MG Road', status: 'Delivered' },
  { id: 2, customer: 'Rahul Singh', address: '45 Park Street', status: 'In Transit' },
  { id: 3, customer: 'Priya Sharma', address: '78 Hill View', status: 'Delivered' },
];

export default function DeliveryHistory() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    // Simulate fetching all deliveries
    const deliveredOnly = dummyDeliveries.filter(d => d.status === 'Delivered');
    setCompleted(deliveredOnly);
  }, []);

  return (
    <div className="delivery-history-container">
      <div className="top-bar">
        <button className="back-button" onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </button>
      </div>

      <h2>Delivery History</h2>

      {completed.length === 0 ? (
        <p className="no-history">No deliveries have been completed yet.</p>
      ) : (
        <ul className="delivery-list">
          {completed.map(del => (
            <li key={del.id} className="delivery-item delivered">
              <div>
                <strong>{del.customer}</strong><br />
                <span>{del.address}</span><br />
                <span>Status: <em>{del.status}</em></span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}