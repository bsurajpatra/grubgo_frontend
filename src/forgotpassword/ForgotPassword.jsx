import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { API_ENDPOINTS, handleApiError, axiosConfig } from '../config'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        
        try {
            const response = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
            setMessage(response.data.message || 'Password sent to your email. Please check your inbox and change it after logging in.');
            setIsError(false);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
            setIsError(true);
            console.error('Error during password recovery:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Password'}
                    </button>
                </form>
                {message && (
                    <div className={`message ${isError ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}
                <div className="links">
                    <a href="/signin">Back to Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 