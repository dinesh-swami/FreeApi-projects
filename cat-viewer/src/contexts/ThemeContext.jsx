import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const THEMES = {
  light: 'theme-light',
  dark: 'theme-dark',
  ocean: 'theme-ocean',
  forest: 'theme-forest',
  sunset: 'theme-sunset'
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('cat-theme') || 'light';
  });

  useEffect(() => {
    Object.values(THEMES).forEach(cls => document.body.classList.remove(cls));
    document.body.classList.add(THEMES[currentTheme]);
    localStorage.setItem('cat-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = (themeName) => {
    if (THEMES[themeName]) setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};