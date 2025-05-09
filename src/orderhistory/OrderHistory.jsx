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

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.ORDERS);
                setOrders(response.data);
                console.log("Orders data:", response.data); // For debugging
            } catch (err) {
                setError(err.message);
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrderHistory();
    }, []);

    if (loading) return <div className="loading">Loading order history...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="order-history">
            <h2>Order History</h2>
            <button className="back-button" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
            </button>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order.order_id} className="order-item">
                            <p>Item: {order.item_name}</p>
                            <p>Total Amount: ${order.total_amount ? order.total_amount.toFixed(2) : '0.00'}</p>
                            <p>Status: {order.status}</p>
                            <p>Order Date: {order.order_date ? new Date(order.order_date).toLocaleString() : 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;