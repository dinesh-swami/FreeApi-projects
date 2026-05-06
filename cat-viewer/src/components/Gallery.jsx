import React from 'react';
import { useGallery } from '../contexts/GalleryContext';

const Gallery = ({ onSelect }) => {
  const { gallery, clearGallery } = useGallery();

  if (gallery.length === 0) return (
    <div className="gallery-sidebar">
      <div className="gallery-title">📸 Recent Cats</div>
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '1rem' }}>No cats saved yet. Click 💾 on a cat to add.</div>
    </div>
  );

  return (
    <div className="gallery-sidebar">
      <div className="gallery-title">
        <span>📸 Recent Cats ({gallery.length})</span>
        <button onClick={clearGallery} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Clear all</button>
      </div>
      <div className="gallery-grid">
        {gallery.map(item => (
          <div key={item.id} className="gallery-item" onClick={() => onSelect(item)}>
            <img src={item.url} alt="Cat" className="gallery-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;