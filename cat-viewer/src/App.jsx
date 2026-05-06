import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { GalleryProvider, useGallery } from './contexts/GalleryContext';
import { useCat } from './hooks/useCat';
import CatCard from './components/CatCard';
import Gallery from './components/Gallery';
import ThemeSwitcher from './components/ThemeSwitcher';
import CatFact from './components/CatFact';
import Toast from './components/Toast';

function AppContent() {
  const { catImage, loading, error, fetchNewCat } = useCat();
  const { addToGallery } = useGallery();
  const [toastMsg, setToastMsg] = useState('');

  const handleNewCat = async () => {
    await fetchNewCat();
    setToastMsg('✨ New cat appeared!');
    setTimeout(() => setToastMsg(''), 2000);
  };

  const handleAddToGallery = () => {
    if (catImage) {
      addToGallery(catImage);
      setToastMsg('💾 Cat saved to gallery!');
      setTimeout(() => setToastMsg(''), 2000);
    }
  };

  const handleSelectGallery = (cat) => {
    // just for demo: could set main image, but we fetch new anyway
    setToastMsg('📸 Switched to gallery cat');
    setTimeout(() => setToastMsg(''), 1500);
  };

  // Keyboard shortcut: spacebar for new cat
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' && !loading) {
        e.preventDefault();
        handleNewCat();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [loading, handleNewCat]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="logo-emoji">🐱‍👤</span>
          <h1>CatVerse Ultra</h1>
        </div>
        <div className="header-actions">
          <ThemeSwitcher />
        </div>
      </header>

      <div className="main-grid">
        <div>
          <CatCard
            catImage={catImage}
            loading={loading}
            error={error}
            onNewCat={handleNewCat}
            onAddToGallery={handleAddToGallery}
          />
          <CatFact />
        </div>
        <Gallery onSelect={handleSelectGallery} />
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GalleryProvider>
        <AppContent />
      </GalleryProvider>
    </ThemeProvider>
  );
}

export default App;