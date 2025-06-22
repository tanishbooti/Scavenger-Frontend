import axios from 'axios';
import { store } from '../store';
import { refreshAccessToken, logout } from '../store/slices/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshAccessToken());
        const token = store.getState().auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) =>
    api.post('/users/login', credentials),

  register: (userData) =>
    api.post('/users/register', userData),

  getProfile: () =>
    api.get('/users/profile'),

  updateProfile: (userData) =>
    api.put('/users/profile', userData),

  refreshToken: (refreshToken) =>
    api.post('/auth/refresh-token', { refreshToken }),

  logout: () =>
    api.post('/users/logout'),
};

// Scam Detection APIs
export const scamAPI = {
  checkText: (text) =>
    api.post('/scam/check-text', { text }),

  checkUrl: (url) =>
    api.post('/scam/check-url', { url }),

  checkImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/scam/check-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  checkPhone: (phoneNumber) =>
    api.post('/scam/check-phone', { phoneNumber }),

  getHistory: () =>
    api.get('/scam/history'),

  getUpdates: () =>
    api.get('/scam/updates'),

  getWatchlist: () =>
    api.get('/scam/watchlist'),

  getAnalytics: () =>
    api.get('/scam/analytics'),

  addToWatchlist: (value, type) =>
    api.post('/scam/watchlist/report', { value, type }),

  removeFromWatchlist: (id) =>
    api.delete(`/scam/watchlist/${id}`),
};

export default api;
