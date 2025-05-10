import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS, authAxiosConfig, handleApiError } from '../config';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate values if not provided by API
  const calculateSubtotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + (item.item_price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // Assuming 8% tax rate
  };

  const calculateDeliveryFee = () => {
    return 2.99; // Fixed delivery fee
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = localStorage.getItem('lastOrderId');
        if (!orderId) {
          navigate('/restaurants');
          return;
        }

        const response = await axios.get(
          API_ENDPOINTS.ORDER_CONFIRMATION(orderId),
          authAxiosConfig()
        );

        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate]);

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
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className="primary-button" 
            onClick={() => navigate('/restaurants')}
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation-container">
        <div className="error-message">
          <h2>Order Not Found</h2>
          <p>We couldn't find your order details.</p>
          <button 
            className="primary-button" 
            onClick={() => navigate('/restaurants')}
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  // Calculate values if not provided by the API
  const subtotal = order.subtotal || calculateSubtotal(order.items);
  const tax = order.tax || calculateTax(subtotal);
  const deliveryFee = order.delivery_fee || calculateDeliveryFee();
  const totalAmount = order.total_amount || (subtotal + tax + deliveryFee);

  return (
    <div className="order-confirmation-container">
      <div className="order-success-banner">
        <h1>Order Confirmed!</h1>
        <p>Your order has been successfully placed.</p>
      </div>

      <div className="order-details-card">
        <h2>Order Details</h2>
        <div className="order-info">
          <p><strong>Order ID:</strong> #{order.order_id}</p>
          <p><strong>Date:</strong> {order.created_at ? new Date(order.created_at).toLocaleString() : new Date().toLocaleString()}</p>
          <p><strong>Restaurant:</strong> {order.restaurant_name}</p>
          <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
          <p><strong>Status:</strong> <span className="status-badge">{order.status}</span></p>
        </div>

        <h3>Order Items</h3>
        <ul className="order-items-list">
          {order.items && order.items.map((item, index) => (
            <li key={index} className="order-item">
              <div className="item-details">
                <span className="item-quantity">{item.quantity}x</span>
                <span className="item-name">{item.item_name}</span>
              </div>
              <span className="item-price">Rs. {(item.item_price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="price-breakdown">
          <div className="price-row">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Tax</span>
            <span>Rs. {tax.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Delivery Fee</span>
            <span>Rs. {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>Rs. {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="secondary-button" 
          onClick={() => navigate('/order-history')}
        >
          View All Orders
        </button>
        <button 
          className="secondary-button" 
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </button>
        <button 
          className="primary-button" 
          onClick={() => navigate('/restaurants')}
        >
          Order More Food
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;