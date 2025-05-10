import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = localStorage.getItem('lastOrderId');
        
        if (!orderId) {
          navigate('/dashboard');
          return;
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }
        
        const response = await axios.get(API_ENDPOINTS.ORDER_CONFIRMATION(orderId), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setOrderDetails(response.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Unable to fetch order details. Please check your order history.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [navigate]);

  const handleViewOrderHistory = () => {
    navigate('/order-history');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="order-confirmation-container">
        <div className="loading-spinner">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation-container">
        <div className="error-message">{error}</div>
        <div className="confirmation-actions">
          <button onClick={handleViewOrderHistory} className="primary-button">
            View Order History
          </button>
          <button onClick={handleBackToDashboard} className="secondary-button">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h1>Order Confirmed!</h1>
          <div className="check-icon">✓</div>
        </div>
        
        <div className="order-info">
          <p className="thank-you-message">
            Thank you for your order. Your food is being prepared and will be delivered soon.
          </p>
          
          <div className="order-details">
            <div className="detail-row">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{orderDetails?.orderId || 'N/A'}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Restaurant:</span>
              <span className="detail-value">{orderDetails?.restaurantName || 'N/A'}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Order Time:</span>
              <span className="detail-value">
                {orderDetails?.orderTime 
                  ? new Date(orderDetails.orderTime).toLocaleString() 
                  : 'N/A'}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Delivery Address:</span>
              <span className="detail-value">{orderDetails?.deliveryAddress || 'N/A'}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">
                {orderDetails?.paymentMethod === 'cash' ? 'Cash on Delivery' :
                 orderDetails?.paymentMethod === 'card' ? 'Credit/Debit Card' :
                 orderDetails?.paymentMethod === 'upi' ? 'UPI' : 'N/A'}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value highlight">
                ${orderDetails?.total?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>
          
          <div className="order-items">
            <h3>Order Items</h3>
            <ul className="items-list">
              {orderDetails?.items?.map((item, index) => (
                <li key={index} className="order-item">
                  <div className="item-details">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              )) || <li>No items found</li>}
            </ul>
          </div>
          
          <div className="estimated-delivery">
            <h3>Estimated Delivery Time</h3>
            <div className="delivery-time">
              {orderDetails?.estimatedDeliveryTime || '30-45 minutes'}
            </div>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <button onClick={handleViewOrderHistory} className="primary-button">
            View Order History
          </button>
          <button onClick={handleBackToDashboard} className="secondary-button">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;