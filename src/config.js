// Fallback to localhost if environment variable is not set
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const authAxiosConfig = () => ({
  headers: {
    ...axiosConfig.headers,
    ...getAuthHeader()
  }
});

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/auth/login`, 
  REGISTER: `${API_BASE_URL}/auth/register`, 
  MENU: `${API_BASE_URL}/dashboard/menu`, 
  
  // Restaurant endpoints
  RESTAURANTS: `${API_BASE_URL}/restaurants`,
  RESTAURANT_MENU: (id) => `${API_BASE_URL}/restaurants/${id}/menu`,
  RESTAURANT_ORDERS: `${API_BASE_URL}/restaurants/orders`,
  RESTAURANT_ORDERS_BY_NAME: `${API_BASE_URL}/restaurants/orders-by-name`,
  RESTAURANT_ORDERS_BY_EMAIL: `${API_BASE_URL}/restaurants/orders-by-email`,

  
  // Order endpoints
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_HISTORY: `${API_BASE_URL}/customer/order-history`,
  ORDER_CONFIRMATION: (id) => `${API_BASE_URL}/orders/${id}/confirmation`,
  ORDER_STATUS: (id) => `${API_BASE_URL}/restaurants/orders/${id}/status`,
  
  // Delivery endpoints
  DELIVERIES: `${API_BASE_URL}/deliveries`,
  NEW_DELIVERIES: `${API_BASE_URL}/deliveries/new`,
  DELIVERY_HISTORY: `${API_BASE_URL}/deliveries/history`,
  
  // Community endpoints
  COMMUNITY_COMMISSION: `${API_BASE_URL}/community/commission`,
  
  // Admin endpoints
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
  ADMIN_RESTAURANTS: `${API_BASE_URL}/super-admin/restaurants`,
  ADMIN_DELIVERY_PARTNERS: `${API_BASE_URL}/super-admin/delivery-partners`,
  ADMIN_COMMUNITY_PRESIDENTS: `${API_BASE_URL}/super-admin/community-presidents`,
  ADMIN_RESTAURANT_OWNERS: `${API_BASE_URL}/admin/restaurant-owners `,
  ADMIN_DELIVERY_PARTNERS: `${API_BASE_URL}/admin/delivery-partners`,
  ADMIN_COMMUNITY_PRESIDENTS: `${API_BASE_URL}/admin/community-presidents`,
  // User profile
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
  DELETE_ACCOUNT: `${API_BASE_URL}/user/account`,
  FORGOT_PASSWORD: `${API_BASE_URL}/password/forgot`,
};

export const handleApiError = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('token');
      return 'Session expired. Please login again.';
    }
    return error.response.data?.error || 'An error occurred';
  } else if (error.request) {
    return 'No response from server. Please try again.';
  } else {
    return error.message || 'An unexpected error occurred';
  }
}; 