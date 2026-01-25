import axios from 'axios';
import { store } from '../app/store';
import { clearAuth } from '../features/auth/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://storra-backend.vercel.app/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token from Redux store
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Track if we're already handling a 401 to prevent multiple redirects
let isRedirecting = false;

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data, config } = error.response;

      // Debug logging
      console.log(`[API Error] ${status} on ${config.url}:`, data);

      if (status === 401) {
        // Only clear auth for specific auth endpoints (login, me, etc.)
        // Don't clear for other endpoints - let them handle their own errors
        const authEndpoints = ['/student/me', '/student/loginuser', '/student/registeruser'];
        const isAuthEndpoint = authEndpoints.some(ep => config.url?.includes(ep));

        // Check if this is definitely a token expiry/invalid issue
        const errorMessage = (data?.message || data?.error || '').toLowerCase();
        const isTokenIssue = errorMessage.includes('token') ||
                            errorMessage.includes('jwt') ||
                            errorMessage.includes('expired') ||
                            errorMessage.includes('invalid signature');

        console.log(`[API 401] isAuthEndpoint: ${isAuthEndpoint}, isTokenIssue: ${isTokenIssue}, message: ${errorMessage}`);

        // Only redirect if it's an auth endpoint AND a clear token issue
        if (isAuthEndpoint && isTokenIssue && !isRedirecting) {
          isRedirecting = true;
          console.warn('Session expired or invalid token. Redirecting to login...');
          store.dispatch(clearAuth());
          setTimeout(() => {
            isRedirecting = false;
            window.location.replace('/auth/student/login');
          }, 100);
        }
      }

      const message = data?.message || data?.error || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
