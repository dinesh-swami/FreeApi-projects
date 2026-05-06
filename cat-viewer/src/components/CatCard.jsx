import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const CatCard = ({ catImage, loading, error, onNewCat, onAddToGallery }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [catImage]);

  const handleDownload = () => {
    if (!catImage?.url) return;
    const link = document.createElement('a');
    link.href = catImage.url;
    link.download = `cat-${catImage.id}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share && catImage?.url) {
      try {
        await navigator.share({
          title: 'Cute Cat',
          text: 'Check out this adorable cat!',
          url: catImage.url,
        });
      } catch (err) { console.log('Share cancelled'); }
    } else {
      navigator.clipboard.writeText(catImage.url);
      alert('Image URL copied to clipboard!');
    }
  };

  return (
    <div className="cat-card">
      <div className="cat-card-header">
        <div className="cat-title">
          <span>🐱</span>
          <span>Random Cat</span>
        </div>
        <div className="cat-badge">❤️ Premium</div>
      </div>
      <div 
        className="image-container" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <div className="loading-wrapper"><Loader /><p>Loading...</p></div>
        ) : error ? (
          <div className="error-wrapper">
            <span>😿</span>
            <p>{error}</p>
            <button className="retry-btn" onClick={onNewCat}>Try Again</button>
          </div>
        ) : catImage && !imgError ? (
          <>
            <img
              src={catImage.url}
              alt="Cute cat"
              className="main-image"
              onError={() => setImgError(true)}
            />
            {isHovered && (
              <div className="image-overlay">
                <button className="action-icon-btn" onClick={handleDownload} title="Download">⬇️</button>
                <button className="action-icon-btn" onClick={handleShare} title="Share">📤</button>
                <button className="action-icon-btn" onClick={onAddToGallery} title="Save to Gallery">💾</button>
              </div>
            )}
          </>
        ) : (
          <div className="error-wrapper"><p>Image failed to load</p><button onClick={onNewCat}>Try again</button></div>
        )}
      </div>
      <div className="cat-card-footer">
        <span className="timestamp">🕐 {new Date().toLocaleTimeString()}</span>
        <button className="new-cat-btn" onClick={onNewCat} disabled={loading}>
          <span>🐾</span> {loading ? 'Loading...' : 'New Cat'}
        </button>
      </div>
    </div>
  );
};

export default CatCard;