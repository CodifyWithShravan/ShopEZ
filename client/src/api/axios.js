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

export default API;
