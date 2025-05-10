import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelStatus, setCancelStatus] = useState({ orderId: null, message: '', isError: false });

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.ORDERS);
            
            // Check if response has the expected format with orders array
            if (response.data && response.data.orders) {
                // Log the first order to see its structure
                if (response.data.orders.length > 0) {
                    console.log("First order sample:", response.data.orders[0]);
                }
                setOrders(response.data.orders);
            } else {
                setOrders([]);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            setCancelStatus({ orderId, message: 'Cancelling...', isError: false });
            const response = await axios.post(`${API_ENDPOINTS.ORDERS}/${orderId}/cancel`);
            
            // Update the order status in the local state
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.order_id === orderId 
                        ? { ...order, status: 'Cancelled' } 
                        : order
                )
            );
            
            setCancelStatus({ orderId: null, message: 'Order cancelled successfully', isError: false });
            
            // Refresh the order list after a short delay
            setTimeout(() => {
                fetchOrderHistory();
                setCancelStatus({ orderId: null, message: '', isError: false });
            }, 3000);
            
        } catch (err) {
            console.error("Error cancelling order:", err);
            setCancelStatus({ 
                orderId, 
                message: err.response?.data?.message || 'Failed to cancel order', 
                isError: true 
            });
        }
    };

    const canBeCancelled = (status, order) => {
        // If the backend sends can_be_cancelled flag, use it
        if (order && order.can_be_cancelled === true) {
            return true;
        }
        
        if (!status) return false;
        
        // Normalize the status by converting to lowercase
        const normalizedStatus = status.toLowerCase();
        
        // Check for various possible formats of "Order Placed" or "Processing"
        return normalizedStatus.includes('placed') || normalizedStatus.includes('processing');
    };

    // Helper function to get restaurant name with fallback
    const getRestaurantName = (order) => {
        // Check if restaurant_name exists and is not null/undefined/empty
        if (order.restaurant_name) {
            return order.restaurant_name;
        }
        return "Unknown Restaurant";
    };

    if (loading) return <div className="loading">Loading order history...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="order-history">
            <h2>Order History</h2>
            <button className="back-button" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
            </button>
            
            {cancelStatus.message && (
                <div className={`status-message ${cancelStatus.isError ? 'error' : 'success'}`}>
                    {cancelStatus.message}
                </div>
            )}
            
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order.order_id} className="order-item">
                            <div className="order-header">
                                <div>
                                    <p>Order ID: {order.order_id}</p>
                                    <p>Restaurant: {getRestaurantName(order)}</p>
                                </div>
                                <div className="order-status">
                                    <span className={`status-badge ${order.status ? order.status.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}>
                                        {order.status || 'Unknown'}
                                    </span>
                                </div>
                            </div>
                            
                            <p>Total Amount: Rs. {order.total_amount ? order.total_amount.toFixed(2) : '0.00'}</p>
                            <p>Order Date: {order.order_date ? new Date(order.order_date).toLocaleString() : 'N/A'}</p>
                            <p>Delivery Address: {order.delivery_address || 'N/A'}</p>
                            
                            {/* For debugging - comment out in production */}
                            {/* <div className="debug-info">
                                <p>Raw restaurant name: "{order.restaurant_name}"</p>
                                <p>Order data: {JSON.stringify(order)}</p>
                            </div> */}
                            
                            {canBeCancelled(order.status, order) && (
                                <button 
                                    className="cancel-button"
                                    onClick={() => handleCancelOrder(order.order_id)}
                                    disabled={cancelStatus.orderId === order.order_id}
                                >
                                    {cancelStatus.orderId === order.order_id ? 'Cancelling...' : 'Cancel Order'}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;