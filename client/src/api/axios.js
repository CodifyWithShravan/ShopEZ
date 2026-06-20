import axios from 'axios';

// Production Render backend URL - fallback if env var not set
const RENDER_URL = 'https://shopez-api-0ca7.onrender.com';

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : import.meta.env.PROD
    ? `${RENDER_URL}/api`
    : '/api';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30s - Render free tier can be slow to wake up
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('shopez_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage and redirect to login if unauthorized
      localStorage.removeItem('shopez_token');
      localStorage.removeItem('shopez_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
