import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useTheme();

  const themes = [
    { id: 'light', emoji: '☀️' },
    { id: 'dark', emoji: '🌙' },
    { id: 'ocean', emoji: '🌊' },
    { id: 'forest', emoji: '🌲' },
    { id: 'sunset', emoji: '🌅' },
  ];

  return (
    <div className="theme-switcher">
      {themes.map(theme => (
        <button
          key={theme.id}
          className={`theme-btn ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => toggleTheme(theme.id)}
          title={theme.id}
        >
          {theme.emoji}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;