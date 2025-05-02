// src/signup/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS, handleApiError, axiosConfig } from '../config'; 
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './SignUp.css'; // Ensure this import is correct

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    if (localStorage.getItem('token')) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const signupData = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      const response = await axios.post(API_ENDPOINTS.SIGNUP, signupData, axiosConfig);
      const data = response.data;

      if (data.startsWith('200::')) {
        navigate('/signin');
      } else {
        setError(data.split('::')[1] || 'Signup failed');
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="signup-logo" />
        </div>
        <div className="signup-fields">
          <h1 className="signup-title">Sign Up</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="signup__form">
            <div className="signup__input-group">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="signup__input-group">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option value="SUPER_ADMIN">🏆 Super Admin (Platform Owner)</option>
                <option value="COMMUNITY_PRESIDENT">🤝 Community Head (Moderator)</option>
                <option value="RESTAURANT_OWNER">🍽 Restaurant Owner</option>
                <option value="DELIVERY_PARTNER">🛵 Delivery Partner</option>
                <option value="CUSTOMER">👤 Customer</option>
              </select>
            </div>
            <div className="signup__input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="signup__input-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="signup__input-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="button">Sign Up</button>
          </form>
          <div className="signup__footer-links" style={{ display: 'flex', justifyContent: 'flex-start', gap: '5rem', marginTop: '1rem' }}>
            <Link to="/signin" className="footer-link">Sign In</Link>
            <Link to="/" className="footer-link">Go Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;