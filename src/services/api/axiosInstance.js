import axios from 'axios';
import { store } from '../../app/store';
import { clearAuth } from '../../features/auth/authSlice';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://storra-backend.vercel.app/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
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

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
