import { createSlice } from '@reduxjs/toolkit';

const getSystemTheme = () => {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
};

const initialState = {
  theme: getSavedTheme() || getSystemTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', state.theme); } catch (e) {}
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      try { localStorage.setItem('theme', action.payload); } catch (e) {}
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
