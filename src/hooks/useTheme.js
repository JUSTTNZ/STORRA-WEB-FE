import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../features/ui/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    console.log('Applying theme:', theme);
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const setAppTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return { theme, toggleTheme: handleToggleTheme, setAppTheme };
};
