import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { API_ENDPOINTS, authAxiosConfig } from '../config';
import Footer from '../footer/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [randomQuote, setRandomQuote] = useState('');

  const quotes = [
    "Good food is good mood.",
    "Delivering happiness, one bite at a time.",
    "Your community, your cuisine.",
    "Every order counts, every delivery matters.",
    "Taste the joy of convenience.",
    "Fueling connections through food."
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');

    console.log("Dashboard loaded with role:", storedRole); // Debug log

    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    setEmail(storedEmail);
    setRole(storedRole);
    setName(storedName || storedEmail);

    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.MENU, authAxiosConfig());

        if (response.data?.menuItems) {
          setMenuItems(response.data.menuItems);
          console.log("Menu items set from API:", response.data.menuItems); // Debug log
          if (response.data.name && !storedName) {
            setName(response.data.name);
            localStorage.setItem('name', response.data.name);
          }
        } else {
          const defaultItems = getDefaultMenuItems(storedRole);
          setMenuItems(defaultItems);
          console.log("Using default menu items for role", storedRole, ":", defaultItems); // Debug log
        }
      } catch (err) {
        setError('Using default menu options.');
        const defaultItems = getDefaultMenuItems(storedRole);
        setMenuItems(defaultItems);
        console.log("Error fetching menu, using default items for role", storedRole, ":", defaultItems); // Debug log
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Enhanced prevention of back navigation
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    
    // Disable browser refresh
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const handleMenuItemClick = (item) => {
    console.log("Menu item clicked:", item); // Debug log
    
    const routes = {
      'Browse Restaurants': '/restaurants',
      'Order History': '/order-history',
      'Profile': '/profile',
      'View Orders': '/view-orders',
      'Update Menu': '/update-menu',
      'View New Deliveries': '/new-deliveries',
      'Delivery History': '/delivery-history',
      'View Restaurants/Partners': '/restaurants-partners',
      'Set Local Commission': '/set-commission',
      'Manage Users': '/manage-users',
      'Manage Restaurants': '/manage-restaurants',
      'Manage Delivery Partners': '/manage-delivery-partners',
      'Manage Community Presidents': '/manage-community-presidents',
    };
    
    const route = routes[item] || '/dashboard';
    console.log("Navigating to route:", route); // Debug log
    
    navigate(route);
  };

  const handleLogout = () => {
    ['token', 'email', 'role', 'name', 'userId'].forEach(key => {
      localStorage.removeItem(key);
    });
    navigate('/', { replace: true });
  };

  const getRoleDisplay = () =>
    role?.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  const getIconForMenuItem = (item) => ({
    'Browse Restaurants': '🍔',
    'Order History': '📜',
    'Profile': '👤',
    'View Orders': '🔔',
    'Update Menu': '🍽️',
    'View New Deliveries': '🚚',
    'Delivery History': '📦',
    'View Restaurants/Partners': '🏪',
    'Set Local Commission': '💰',
    'Manage Users': '👥',
    'Manage Restaurants': '🏢',
    'Manage Delivery Partners': '🚚',
    'Manage Community Presidents': '👑'
  }[item] || '📋');

  const getDefaultMenuItems = (role) => {
    const menuItems = {
      'CUSTOMER': ['Browse Restaurants', 'Order History', 'Profile'],
      'RESTAURANT_OWNER': ['View Orders', 'Update Menu', 'Profile'],
      'DELIVERY_PARTNER': ['View New Deliveries', 'Delivery History', 'Profile'],
      'COMMUNITY_PRESIDENT': ['View Restaurants/Partners', 'Set Local Commission', 'Profile'],
      'SUPER_ADMIN': ['Manage Users', 'Manage Restaurants', 'Manage Delivery Partners', 'Manage Community Presidents', 'Profile', 'Manage Users'],
    }[role] || ['Profile'];
    
    console.log("Menu items for role", role, ":", menuItems); // Debug log
    return menuItems;
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
      <header className="dashboard-header">
  <div className="logo-title">
    <img src="/logo.png" alt="GrubGo Logo" className="app-logo" />
    <h2 className="app-title">GrubGo</h2>
  </div>
  <div className="header-right">
    {role && <p className="role-badge">{getRoleDisplay()}</p>}
    <button onClick={handleLogout} className="logout-button">Logout</button>
  </div>
</header>

        <div className="welcome-role-container">
          <h1 className="welcome-message">Welcome, {name || 'Guest'}</h1>
        </div>

        <div className="quote-section">
          <p className="random-quote">"{randomQuote}"</p>
        </div>

        {loading ? (
          <div className="loading">Loading dashboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="card-container">
            {menuItems.map((item, index) => {
              console.log("Rendering menu item:", item); // Debug log
              return (
                <div 
                  key={index} 
                  className="menu-card" 
                  onClick={() => {
                    handleMenuItemClick(item);
                  }}
                >
                  <div className="card-icon">{getIconForMenuItem(item)}</div>
                  <h3>{item}</h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Use both named and default export for compatibility
export { Dashboard };
export default Dashboard;
