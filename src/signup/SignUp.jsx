import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS, handleApiError, axiosConfig } from '../config'; 
import Footer from '../footer/Footer';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    confirmPassword: '',
    phoneNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Countdown effect for redirection
  useEffect(() => {
    let timer;
    if (redirectCountdown !== null && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
    } else if (redirectCountdown === 0) {
      navigate('/signin');
    }
    return () => clearTimeout(timer);
  }, [redirectCountdown, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
  
    try {
      console.log("Registration data:", formData);
      
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      };
  
      const response = await axios.post(API_ENDPOINTS.REGISTER, signupData, axiosConfig);
      const data = response.data;
      console.log("Registration response:", data);
  
      if (data.message) {
        // Success case - show success message and start countdown
        setSuccess(`Registration successful! Redirecting to login page in 5 seconds...`);
        setRedirectCountdown(5);
      } else {
        // Unknown success format
        setError('Registration successful but received unexpected response format');
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle the error properly
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        // If it's an object with an error property
        if (typeof errorData === 'object' && errorData.error) {
          setError(errorData.error);
        } 
        // If it's a string
        else if (typeof errorData === 'string') {
          setError(errorData);
        }
        // Otherwise use a generic message
        else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setError(handleApiError(error));
      }
    } finally {
      setIsLoading(false);
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
          
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i> {success}
              {redirectCountdown !== null && (
                <div className="countdown-timer">{redirectCountdown}</div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="signup__form">
            <div className="signup__input-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={isLoading || success}
              />
            </div>
            <div className="signup__input-group">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={isLoading || success}
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
                disabled={isLoading || success}
              />
            </div>
            <div className="signup__input-group">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={isLoading || success}
              />
            </div>
            <div className="signup__input-group">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                disabled={isLoading || success}
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
                disabled={isLoading || success}
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
                disabled={isLoading || success}
              />
            </div>
            <button 
              type="submit" 
              className={`button ${(isLoading || success) ? 'button-disabled' : ''}`}
              disabled={isLoading || success}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
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