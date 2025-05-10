import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import './ManageCommunityPresidents.css';
import { useNavigate } from 'react-router-dom';

const ManageCommunityPresidents = () => {
  const [communityPresidents, setCommunityPresidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunityPresidents = async () => {
      try {
        console.log('Fetching community presidents from:', API_ENDPOINTS.ADMIN_COMMUNITY_PRESIDENTS);
        
        // Make the request without any authorization headers
        const response = await axios.get(API_ENDPOINTS.ADMIN_COMMUNITY_PRESIDENTS, {
          headers: {
            // Explicitly set empty headers to ensure no JWT is sent
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        
        setCommunityPresidents(response.data);
      } catch (err) {
        console.error('Error fetching community presidents:', err);
        if (err.response) {
          console.error('Response status:', err.response.status);
          console.error('Response data:', err.response.data);
        }
        setError('Failed to fetch community presidents');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityPresidents();
  }, []);

  if (loading) {
    return <div className="loading">Loading community presidents...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-community-presidents">
      <h2>Manage Community Presidents</h2>
      <button 
        className="back-button" 
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </button>
      {communityPresidents.length === 0 ? (
        <p className="no-data">No community presidents found.</p>
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
            {communityPresidents.map(president => (
              <tr key={president.id}>
                <td>{president.id}</td>
                <td>{president.name}</td>
                <td>{president.email}</td>
                <td>{president.phoneNumber || 'N/A'}</td>
                <td>{president.address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCommunityPresidents; 