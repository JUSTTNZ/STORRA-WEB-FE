import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import userReducer from '../features/user/userSlice';

// Load auth state from localStorage
const loadAuthState = () => {
  try {
    const serializedAuth = localStorage.getItem('auth');
    if (serializedAuth === null) {
      return undefined;
    }
    return JSON.parse(serializedAuth);
  } catch (err) {
    console.error('Failed to load auth state:', err);
    return undefined;
  }
};

// Save auth state to localStorage
const saveAuthState = (state) => {
  try {
    const serializedAuth = JSON.stringify({
      user: state.auth.user,
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
    });
    localStorage.setItem('auth', serializedAuth);
  } catch (err) {
    console.error('Failed to save auth state:', err);
  }
};

import themeReducer from '../features/ui/themeSlice';

// Get persisted auth state
const persistedAuth = loadAuthState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    theme: themeReducer,
  },
  preloadedState: persistedAuth ? {
    auth: {
      user: persistedAuth.user || null,
      token: persistedAuth.token || null,
      isAuthenticated: persistedAuth.isAuthenticated || false,
      isLoading: false,
      error: null,
      signupData: {
        accountType: null,
        fullName: null,
        email: null,
        phoneNumber: null,
        password: null,
        parentPhoneNumber: null,
      },
    },
  } : undefined,
});

// Subscribe to store changes and persist auth state
store.subscribe(() => {
  saveAuthState(store.getState());
});

export default store;
