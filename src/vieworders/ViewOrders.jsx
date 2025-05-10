import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS, authAxiosConfig } from '../config';
import './ViewOrders.css';
import { toast } from 'react-toastify';

const ViewOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Check if user is a restaurant owner
    const userRole = localStorage.getItem('role');
    if (userRole !== 'RESTAURANT_OWNER') {
      navigate('/dashboard');
      return;
    }

    fetchRecentOrders();
  }, [navigate]);

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const email = localStorage.getItem('email');
      
      const response = await axios.get(API_ENDPOINTS.RESTAURANT_ORDERS, {
        ...authAxiosConfig(),
        params: { email }
      });

      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching recent orders:', err);
      setError('Unable to fetch recent orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(API_ENDPOINTS.ORDER_STATUS(orderId), 
        { status: newStatus },
        authAxiosConfig()
      );
      
      // Update the order status locally
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status. Please try again.');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getFilteredOrders = () => {
    if (statusFilter === 'all') {
      return orders;
    }
    return orders.filter(order => order.status.toLowerCase() === statusFilter);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-badge pending';
      case 'preparing':
        return 'status-badge preparing';
      case 'ready':
        return 'status-badge ready';
      case 'delivered':
        return 'status-badge delivered';
      case 'cancelled':
        return 'status-badge cancelled';
      default:
        return 'status-badge';
    }
  };

  if (loading) {
    return (
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <div className="loading">Loading recent orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <div className="error-message">{error}</div>
        <button onClick={handleBackToDashboard} className="back-button">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="recent-orders">
      <header className="orders-header">
        <h2>Recent Orders</h2>
        <button onClick={handleBackToDashboard} className="back-button">Back to Dashboard</button>
      </header>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select 
            id="status-filter" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready for Pickup</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button onClick={fetchRecentOrders} className="refresh-button">
          Refresh Orders
        </button>
      </div>

      {getFilteredOrders().length === 0 ? (
        <div className="no-orders">
          <p>No {statusFilter !== 'all' ? statusFilter : ''} orders found.</p>
        </div>
      ) : (
        <div className="orders-list">
          {getFilteredOrders().map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order.id}</span>
                <span className={getStatusBadgeClass(order.status)}>
                  {order.status}
                </span>
              </div>
              
              <div className="order-time">
                <p><strong>Ordered:</strong> {new Date(order.created_at).toLocaleString()}</p>
              </div>
              
              <div className="customer-info">
                <p><strong>Customer:</strong> {order.customer_name || 'Anonymous'}</p>
                <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
              </div>
              
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items && Array.isArray(order.items) ? (
                    order.items.map((item, index) => (
                      <li key={index}>
                        <span className="item-quantity">{item.quantity}x</span>
                        <span className="item-name">{item.name || item.item_name}</span>
                        <span className="item-price">${item.price || item.item_price}</span>
                      </li>
                    ))
                  ) : (
                    <li>No items available</li>
                  )}
                </ul>
                <div className="order-total">
                  <p><strong>Total:</strong> ${order.total_amount.toFixed(2)}</p>
                </div>
              </div>
              
              {order.special_instructions && (
                <div className="special-instructions">
                  <p><strong>Special Instructions:</strong></p>
                  <p>{order.special_instructions}</p>
                </div>
              )}
              
              <div className="order-actions">
                <h4>Update Status:</h4>
                <div className="action-buttons">
                  {order.status.toLowerCase() === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange(order.id, 'PREPARING')}
                        className="action-button preparing"
                      >
                        Start Preparing
                      </button>
                      <button 
                        onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                        className="action-button cancel"
                      >
                        Cancel Order
                      </button>
                    </>
                  )}
                  
                  {order.status.toLowerCase() === 'preparing' && (
                    <button 
                      onClick={() => handleStatusChange(order.id, 'READY')}
                      className="action-button ready"
                    >
                      Mark as Ready
                    </button>
                  )}
                  
                  {order.status.toLowerCase() === 'ready' && (
                    <button 
                      onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                      className="action-button delivered"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  
                  {(order.status.toLowerCase() !== 'delivered' && 
                    order.status.toLowerCase() !== 'cancelled') && (
                    <button 
                      onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                      className="action-button cancel"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
