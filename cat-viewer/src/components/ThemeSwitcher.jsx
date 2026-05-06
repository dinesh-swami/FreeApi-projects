import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useTheme();

  const themes = [
    { id: 'light', emoji: '☀️', name: 'Light' },
    { id: 'dark', emoji: '🌙', name: 'Dark' },
    { id: 'ocean', emoji: '🌊', name: 'Ocean' },
    { id: 'forest', emoji: '🌲', name: 'Forest' },
    { id: 'sunset', emoji: '🌅', name: 'Sunset' },
  ];

  return (
    <div className="theme-switcher">
      {themes.map(theme => (
        <button
          key={theme.id}
          className={`theme-btn ${currentTheme === theme.id ? 'active' : ''}`}
          onClick={() => toggleTheme(theme.id)}
          title={theme.name}
        >
          {theme.emoji}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;