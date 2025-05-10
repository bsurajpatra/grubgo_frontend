import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import './ManageDeliveryPartners.css';

const ManageDeliveryPartners = () => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        console.log('Fetching delivery partners from:', API_ENDPOINTS.ADMIN_DELIVERY_PARTNERS);
        
        // Make the request without any authorization headers
        const response = await axios.get(API_ENDPOINTS.ADMIN_DELIVERY_PARTNERS, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        
        setDeliveryPartners(response.data);
      } catch (err) {
        console.error('Error fetching delivery partners:', err);
        if (err.response) {
          console.error('Response status:', err.response.status);
          console.error('Response data:', err.response.data);
        }
        setError('Failed to fetch delivery partners');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryPartners();
  }, []);

  if (loading) {
    return <div className="loading">Loading delivery partners...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-delivery-partners">
      <h2>Manage Delivery Partners</h2>
      {deliveryPartners.length === 0 ? (
        <p className="no-data">No delivery partners found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {deliveryPartners.map(partner => (
              <tr key={partner.id}>
                <td>{partner.id}</td>
                <td>{partner.name}</td>
                <td>{partner.email}</td>
                <td>{partner.phoneNumber || 'N/A'}</td>
                <td>{partner.address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageDeliveryPartners;