// src/App.jsx
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import JokeCard from './components/JokeCard';
import ThemeSwitcher from './components/ThemeSwitcher';
import useJokes from './hooks/useJokes';

function App() {
  const { joke, loading, error, fetchNewJoke } = useJokes();

  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="logo-container">
            <div className="logo-icon">😂</div>
            <h1 className="logo-text">JokeVerse</h1>
          </div>
          <ThemeSwitcher />
        </header>npm install

        <main className="app-main">
          <div className="hero-section">
            <h2 className="hero-title">Random Jokes Generator</h2>
            <p className="hero-subtitle">
              Laugh your heart out with our curated collection of hilarious jokes
            </p>
          </div>

          <JokeCard
            joke={joke}
            loading={loading}
            error={error}
            onNewJoke={fetchNewJoke}
          />
        </main>

        <footer className="app-footer">
          <p>Powered by FreeAPI | Endless laughter guaranteed ✨</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;