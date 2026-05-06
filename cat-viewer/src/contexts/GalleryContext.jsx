import React, { createContext, useContext, useState, useEffect } from 'react';

const GalleryContext = createContext();

const STORAGE_KEY = 'cat_gallery';

export const useGallery = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }) => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setGallery(JSON.parse(saved));
  }, []);

  const addToGallery = (catImage) => {
    if (!catImage || !catImage.url) return;
    const newItem = {
      id: catImage.id,
      url: catImage.url,
      timestamp: Date.now(),
    };
    setGallery(prev => {
      const exists = prev.some(item => item.id === newItem.id);
      if (exists) return prev;
      const updated = [newItem, ...prev].slice(0, 12); // keep last 12
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearGallery = () => {
    setGallery([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GalleryContext.Provider value={{ gallery, addToGallery, clearGallery }}>
      {children}
    </GalleryContext.Provider>
  );
};