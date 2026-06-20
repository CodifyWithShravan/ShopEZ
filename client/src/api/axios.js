import axios from 'axios';

// In production (Vercel), VITE_API_URL points to Render backend.
// In development, Vite proxy handles /api → localhost:5001
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default API;
