import React, { useState, useEffect } from 'react';
import './NewDeliveries.css';

const dummyDeliveries = [
  { id: 1, customer: 'Alice Kumar', address: '123 MG Road', status: 'Pending' },
  { id: 2, customer: 'Rahul Singh', address: '45 Park Street', status: 'In Transit' },
];

export default function NewDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Simulate fetching assigned deliveries
    setDeliveries(dummyDeliveries);
  }, []);

  const updateStatus = (id, newStatus) => {
    setDeliveries(prev =>
      prev.map(del =>
        del.id === id ? { ...del, status: newStatus } : del
      )
    );
  };

  const getNextStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'In Transit';
      case 'In Transit':
        return 'Delivered';
      default:
        return 'Delivered';
    }
  };

  return (
    <div className="delivery-guy-container">
      <div className="top-bar">
        <button
          className="back-button"
          onClick={() => window.location.href = '/dashboard'}
        >
          Back to Dashboard
        </button>
      </div>

      <h2>Your Deliveries</h2>

      <ul className="delivery-list">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="delivery-item">
            <div>
              <strong>{delivery.customer}</strong><br />
              <span>{delivery.address}</span><br />
              <span>Status: <em>{delivery.status}</em></span>
            </div>
            {delivery.status !== 'Delivered' && (
              <button
                className="status-button"
                onClick={() =>
                  updateStatus(delivery.id, getNextStatus(delivery.status))
                }
              >
                Mark as {getNextStatus(delivery.status)}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
