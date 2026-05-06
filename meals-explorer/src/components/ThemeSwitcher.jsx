import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useTheme();

  const themesList = [
    { id: 'light', emoji: '☀️', label: 'Light' },
    { id: 'dark', emoji: '🌙', label: 'Dark' },
    { id: 'ocean', emoji: '🌊', label: 'Ocean' },
    { id: 'forest', emoji: '🌲', label: 'Forest' },
    { id: 'sunset', emoji: '🌅', label: 'Sunset' }
  ];

  return (
    <div className="theme-switcher">
      {themesList.map(theme => (
        <button
          key={theme.id}
          className={`theme-btn ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => toggleTheme(theme.id)}
          title={theme.label}
        >
          {theme.emoji}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;