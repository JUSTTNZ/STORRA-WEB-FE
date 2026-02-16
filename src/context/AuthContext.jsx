import React, { createContext, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  setToken,
  fetchCurrentUser, // Add this
} from '../features/auth/authSlice';
import authService from '../services/authService';
import { clearCache, prefetchAll } from '../services/dataCache';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  // Add this function to fetch current user
  const fetchUserProfile = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      return userData;
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      throw err;
    }
  }, []);

  const login = useCallback(
    async (credentials) => {
      dispatch(loginStart());
      try {
        // 1. Login to get token
        const data = await authService.login(credentials);
        dispatch(setToken(data.token));
        
        // 2. Fetch complete user profile
        const userProfile = await fetchUserProfile();
        // 3. Dispatch success with both token and full user data
        dispatch(
          loginSuccess({
            token: data.token,
            user: userProfile.user || userProfile, // Use full user profile
          })
        );

        // Prefetch all data into cache so pages load instantly
        prefetchAll();

        return { token: data.token, user: userProfile };
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        throw err;
      }
    },
    [dispatch, fetchUserProfile]
  );

  const register = useCallback(
    async (userData) => {
      dispatch(registerStart());
      try {
        // 1. Register
        const data = await authService.register(userData);
        dispatch(setToken(data.token));
        
        // 2. Fetch user profile
        const userProfile = await fetchUserProfile();
        
        // 3. Dispatch success
        dispatch(
          registerSuccess({
            token: data.token,
            user: userProfile.user || userProfile,
          })
        );
        
        return { token: data.token, user: userProfile };
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Registration failed';
        dispatch(registerFailure(errorMessage));
        throw err;
      }
    },
    [dispatch, fetchUserProfile]
  );

  // Add auto-fetch on mount if token exists
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [token, user, dispatch]);

  const logoutUser = useCallback(() => {
    clearCache();
    dispatch(logout());
  }, [dispatch]);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: logoutUser,
    refreshUser: fetchUserProfile, // Expose for manual refresh
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
