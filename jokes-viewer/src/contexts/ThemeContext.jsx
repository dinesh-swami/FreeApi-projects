// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const THEMES = {
  light: 'theme-light',
  dark: 'theme-dark',
  ocean: 'theme-ocean',
  sunset: 'theme-sunset',
  forest: 'theme-forest'
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('jokeverse-theme');
    return savedTheme && THEMES[savedTheme] ? savedTheme : 'light';
  });

  useEffect(() => {
    // Remove all theme classes
    Object.values(THEMES).forEach(themeClass => {
      document.body.classList.remove(themeClass);
    });
    // Add current theme class
    document.body.classList.add(THEMES[currentTheme]);
    // Save to localStorage
    localStorage.setItem('jokeverse-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = (themeName) => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};