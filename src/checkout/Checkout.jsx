import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS, authAxiosConfig, handleApiError } from '../config';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    contactPhone: '',
    paymentMethod: 'cash'
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (!savedCart || JSON.parse(savedCart).length === 0) {
      navigate('/restaurants');
      return;
    }
    
    const parsedCart = JSON.parse(savedCart);
    setCart(parsedCart);
    
    // Store restaurant ID for back navigation
    if (parsedCart.length > 0) {
      localStorage.setItem('lastRestaurantId', parsedCart[0].restaurantId);
    }
    
    // Pre-fill address from user profile if available
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }
        
        const response = await axios.get(API_ENDPOINTS.USER_PROFILE, authAxiosConfig());
        
        if (response.data && response.data.address) {
          setFormData(prev => ({
            ...prev,
            deliveryAddress: response.data.address
          }));
        }
        
        if (response.data && response.data.phoneNumber) {
          setFormData(prev => ({
            ...prev,
            contactPhone: response.data.phoneNumber
          }));
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);

  // Handle browser back navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const lastRestaurantId = localStorage.getItem('lastRestaurantId');
      if (lastRestaurantId) {
        navigate(`/restaurant/${lastRestaurantId}`);
      }
    };

    window.addEventListener('popstate', handleBeforeUnload);
    return () => {
      window.removeEventListener('popstate', handleBeforeUnload);
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // Assuming 8% tax
  };

  const calculateDeliveryFee = () => {
    return 2.99; // Fixed delivery fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }
      
      // Format order data according to API requirements
      const orderData = {
        restaurant_id: cart[0].restaurantId,
        items: cart.map(item => ({
          menu_item_id: item.itemId,
          quantity: item.quantity,
          item_price: item.price,
          item_name: item.name
        })),
        total_amount: calculateTotal(),
        delivery_address: formData.deliveryAddress
      };
      
      // Send order to backend using authAxiosConfig
      const response = await axios.post(API_ENDPOINTS.ORDERS, orderData, authAxiosConfig());
      
      // Clear cart and show success message
      localStorage.removeItem('cart');
      setSuccess(true);
      setOrderPlaced(true);
      
      // Store order ID for tracking
      if (response.data && response.data.order_id) {
        localStorage.setItem('lastOrderId', response.data.order_id);
      }
      
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 2000);
      
    } catch (err) {
      console.error('Error placing order:', err);
      setError(handleApiError(err) || 'Unable to place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    navigate('/restaurants');
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <h2>Order Placed Successfully!</h2>
          <p>Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-grid">
        <div className="checkout-form-container">
          <h2>Delivery Details</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Order placed successfully!</div>}
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                required
                placeholder="Enter your full address"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                required
                placeholder="Phone number for delivery"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => navigate('/restaurants')}
              >
                Back to Restaurant
              </button>
              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="restaurant-name">
            <h3>{cart.length > 0 ? cart[0].restaurantName : 'Restaurant'}</h3>
          </div>
          
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item.itemId} className="cart-item">
                <div className="item-details">
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <span className="item-price">Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>Rs. {calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Tax (8%)</span>
              <span>Rs. {calculateTax().toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Delivery Fee</span>
              <span>Rs. {calculateDeliveryFee().toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>Rs. {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            className="clear-cart-button" 
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;