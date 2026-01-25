import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  theme: 'light',
  toast: {
    isVisible: false,
    message: '',
    type: 'info', // 'success' | 'error' | 'warning' | 'info'
  },
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    showToast: (state, action) => {
      state.toast = {
        isVisible: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast: (state) => {
      state.toast = {
        isVisible: false,
        message: '',
        type: 'info',
      };
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Actions
export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
  showToast,
  hideToast,
  openModal,
  closeModal,
  setGlobalLoading,
} = uiSlice.actions;

// Selectors
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectToast = (state) => state.ui.toast;
export const selectModal = (state) => state.ui.modal;
export const selectGlobalLoading = (state) => state.ui.isLoading;

export default uiSlice.reducer;
