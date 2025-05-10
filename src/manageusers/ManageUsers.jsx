import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, authAxiosConfig } from '../config';
import './ManageUsers.css';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', API_ENDPOINTS.ADMIN_USERS);
        const response = await axios.get(API_ENDPOINTS.ADMIN_USERS, authAxiosConfig());
        console.log('Response:', response.data);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleClassName = (role) => {
    if (!role) return '';
    
    const normalizedRole = role.toLowerCase().replace(/_/g, '-');
    return `role-${normalizedRole}`;
  };

  return (
    <div className="manage-users-container">
      <div className="manage-users-header">
        <h2>Manage Users</h2>
        <button 
          className="back-button" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <div className="manage-users-table-container">
          <table className="manage-users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-role ${getRoleClassName(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers; 