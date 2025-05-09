import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import './Profile.css';
import Footer from '../footer/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    
    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(API_ENDPOINTS.USER_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        setProfile({
          name: response.data.name || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          address: response.data.address || '',
          role: response.data.role || localStorage.getItem('role') || ''
        });
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Unable to fetch profile information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.put(API_ENDPOINTS.UPDATE_PROFILE, profile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Unable to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.post(API_ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error changing password:', err);
      if (err.response && err.response.status === 401) {
        setPasswordError('Current password is incorrect');
      } else {
        setPasswordError('Unable to change password. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getRoleDisplay = () => {
    return profile.role?.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="header-actions">
          <h1>My Profile</h1>
          <button className="back-button" onClick={handleBackToDashboard}>← Back to Dashboard</button>
        </div>
        
        {loading && !isChangingPassword && !isEditing ? (
          <div className="loading">Loading profile...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="profile-title">
                  <h2>{profile.name || 'User'}</h2>
                  <span className="role-badge">{getRoleDisplay()}</span>
                </div>
                {!isEditing && !isChangingPassword && (
                  <button 
                    className="edit-button" 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                    <small>Email cannot be changed</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="save-button" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : isChangingPassword ? (
                <form className="profile-form" onSubmit={handlePasswordSubmit}>
                  <h3>Change Password</h3>
                  
                  {passwordError && <div className="error-message">{passwordError}</div>}
                  
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="cancel-button" 
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordError('');
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-button" disabled={loading}>
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">{profile.name || 'Not provided'}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{profile.email}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Phone Number</span>
                    <span className="detail-value">{profile.phoneNumber || 'Not provided'}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Address</span>
                    <span className="detail-value">{profile.address || 'Not provided'}</span>
                  </div>
                </div>
              )}
            </div>
            
            {!isEditing && !isChangingPassword && (
              <div className="additional-options">
                <button 
                  className="option-button"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change Password
                </button>
                <button className="option-button danger">Delete Account</button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;