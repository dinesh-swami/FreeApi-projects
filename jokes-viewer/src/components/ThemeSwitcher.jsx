import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, toggleTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Light', emoji: '☀️', color: '#FFD700' },
    { id: 'dark', name: 'Dark', emoji: '🌙', color: '#6366F1' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊', color: '#06B6D4' },
    { id: 'forest', name: 'Forest', emoji: '🌲', color: '#10B981' },
    { id: 'sunset', name: 'Sunset', emoji: '🌅', color: '#F59E0B' },
  ];

  return (
    <div className="theme-switcher">
      <div className="theme-label">
        <span className="theme-label-text">Themes</span>
      </div>
      <div className="theme-buttons">
        {themes.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              className={`theme-button ${isActive ? 'active' : ''}`}
              onClick={() => toggleTheme(theme.id)}
              title={`Switch to ${theme.name} theme`}
              style={{ '--theme-color': theme.color }}
            >
              <span className="theme-emoji">{theme.emoji}</span>
              <span className="theme-name">{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher;