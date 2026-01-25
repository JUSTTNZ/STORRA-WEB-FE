import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./styles/globals.css";
import App from "./App.jsx";
import { useTheme } from "./hooks/useTheme";

function ThemeInitializer({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeInitializer>
        <App />
      </ThemeInitializer>
    </Provider>
  </StrictMode>
);
