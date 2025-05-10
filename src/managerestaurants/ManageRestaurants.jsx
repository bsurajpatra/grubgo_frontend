import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import './ManageRestaurants.css';
import { useNavigate } from 'react-router-dom';

const ManageRestaurants = () => {
  const [restaurantOwners, setRestaurantOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantOwners = async () => {
      try {
        console.log('Fetching restaurant owners from:', API_ENDPOINTS.ADMIN_RESTAURANT_OWNERS);
        
        // Make the request without any authorization headers
        const response = await axios.get(API_ENDPOINTS.ADMIN_RESTAURANT_OWNERS, {
          headers: {
            // Explicitly set empty headers to ensure no JWT is sent
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        
        setRestaurantOwners(response.data);
      } catch (err) {
        console.error('Error fetching restaurant owners:', err);
        if (err.response) {
          console.error('Response status:', err.response.status);
          console.error('Response data:', err.response.data);
        }
        setError('Failed to fetch restaurant owners');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantOwners();
  }, []);

  if (loading) {
    return <div className="loading">Loading restaurant owners...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-restaurants">
      <h2>Manage Restaurant Owners</h2>
      <button 
          className="back-button" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      {restaurantOwners.length === 0 ? (
        <p className="no-data">No restaurant owners found.</p>
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
            {restaurantOwners.map(owner => (
              <tr key={owner.id}>
                <td>{owner.id}</td>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.phoneNumber || 'N/A'}</td>
                <td>{owner.address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageRestaurants; 