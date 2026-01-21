import React, { createContext, useCallback } from 'react';
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
} from '../features/auth/authSlice';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (credentials) => {
      dispatch(loginStart());
      try {
        const data = await authService.login(credentials);
        dispatch(
          loginSuccess({
            token: data.token,
            user: data.user,
          })
        );
        if (data.token) {
          dispatch(setToken(data.token));
        }
        return data;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        throw err;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (userData) => {
      dispatch(registerStart());
      try {
        const data = await authService.register(userData);
        dispatch(
          registerSuccess({
            token: data.token,
            user: data.user,
          })
        );
        if (data.token) {
          dispatch(setToken(data.token));
        }
        return data;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Registration failed';
        dispatch(registerFailure(errorMessage));
        throw err;
      }
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
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
