import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';
import './Restaurants.css';


const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(false);
  const [activeLocation, setActiveLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Fetch user profile to get their location
    fetchUserLocation();
  }, [navigate]);

  const fetchUserLocation = async () => {
    try {
      setIsUserLocationLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await axios.get(API_ENDPOINTS.USER_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Check if the API returns user profile with an address field
      if (response.data && response.data.address) {
        setUserLocation(response.data.address);
      }
    } catch (err) {
      console.error('Error fetching user location:', err);
      // We don't set this as a blocking error since restaurants can still be shown
    } finally {
      setIsUserLocationLoading(false);
    }
  };
  
  const fetchRestaurants = async (searchLocation = null) => {
    try {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        navigate('/login');
        return;
      }

      // Only use userLocation if provided
      const locationToSearch = searchLocation || '';
      if (locationToSearch) {
        setActiveLocation(locationToSearch);
      } else {
        setActiveLocation('');
      }
      
      const endpoint = locationToSearch
        ? `${API_ENDPOINTS.RESTAURANTS}?address=${encodeURIComponent(locationToSearch)}`
        : API_ENDPOINTS.RESTAURANTS;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRestaurants(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Unable to fetch restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantMenu = async (restaurantId) => {
    try {
      setLoading(true);
      const token = getAuthToken();

      const response = await axios.get(API_ENDPOINTS.RESTAURANT_MENU(restaurantId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMenu(response.data);
      setSelectedRestaurant(restaurantId);
      setError(null);
    } catch (err) {
      console.error('Error fetching restaurant menu:', err);
      setError('Unable to fetch menu. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of restaurants
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Handle using user's location
  const handleUseMyLocation = () => {
    if (userLocation) {
      fetchRestaurants(userLocation); // Fetch restaurants based on user's location
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      fetchRestaurants(searchLocation.trim());
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    fetchRestaurantMenu(restaurantId);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
    setMenu([]);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const RestaurantList = () => (
    <div className="restaurant-list">
      <div className="header-actions">
        <h2>Restaurants</h2>
        <button className="back-button" onClick={handleBackToDashboard}>← Back to Dashboard</button>
      </div>
      
      <div className="location-controls">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter location to search..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
        
        <div className="location-search">
          <button 
            type="button" 
            onClick={handleUseMyLocation} 
            disabled={isUserLocationLoading || !userLocation}
            className="my-location-button"
          >
            {isUserLocationLoading ? 'Loading...' : 'Use My Location'}
          </button>
        </div>
        
        {activeLocation && (
          <div className="active-location">
            <p><strong>Showing restaurants near:</strong> {activeLocation}</p>
          </div>
        )}
      </div>
      
      {loading ? (
        <p>Loading restaurants...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : restaurants.length === 0 ? (
        <p>No restaurants found. Try a different location.</p>
      ) : (
        <div className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-card"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              {restaurant.imageUrl && (
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
              )}
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisineType}</p>
                <p>{restaurant.address}</p>
                {restaurant.rating && (
                  <div className="rating">★ {restaurant.rating.toFixed(1)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const RestaurantMenu = () => {
    const restaurant = restaurants.find((r) => r.id === selectedRestaurant);

    return (
      <div className="restaurant-menu">
        <div className="header-actions">
          <button className="back-button" onClick={handleBackToRestaurants}>
            ← Back to Restaurants
          </button>
        </div>
        {restaurant && (
          <div className="restaurant-header">
            {restaurant.imageUrl && (
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="restaurant-banner"
              />
            )}
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <div className="restaurant-meta">
              <span>{restaurant.cuisineType}</span>
              <span>{restaurant.address}</span>
              {restaurant.rating && (
                <span className="rating">★ {restaurant.rating.toFixed(1)}</span>
              )}
            </div>
          </div>
        )}
        <h3>Menu</h3>
        {loading ? (
          <p>Loading menu...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : menu.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          <div className="menu-categories">
            {Object.entries(
              menu.reduce((acc, item) => {
                const category = item.category || 'Uncategorized';
                if (!acc[category]) acc[category] = [];
                acc[category].push(item);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="menu-category">
                <h4>{category}</h4>
                <div className="menu-items">
                  {items.map((item) => (
                    <div key={item.itemId} className="menu-item">
                      <div className="menu-item-info">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <span className="price">${item.price.toFixed(2)}</span>
                      </div>
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="menu-item-image"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="restaurants-container">
      {selectedRestaurant ? <RestaurantMenu /> : <RestaurantList />}
    </div>
  );
};

export default Restaurants;