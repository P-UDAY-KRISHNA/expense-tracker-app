import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(GlobalContext);

  return (
    <div className="theme-toggle-container">
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? (
          <i className="fas fa-moon"></i> // Show moon icon in light mode
        ) : (
          <i className="fas fa-sun"></i> // Show sun icon in dark mode
        )}
      </button>
    </div>
  );
};