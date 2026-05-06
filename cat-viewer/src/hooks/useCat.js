import { useState, useCallback, useRef, useEffect } from 'react';

const API_URL = '/api/api/v1/public/cats/cat/random';

export const useCat = () => {
  const [catImage, setCatImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchNewCat = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      let imageUrl = null;
      if (json.data?.imageUrl) imageUrl = json.data.imageUrl;
      else if (json.data?.url) imageUrl = json.data.url;
      else if (json.imageUrl) imageUrl = json.imageUrl;
      else imageUrl = `https://cataas.com/cat?width=600&height=400&t=${Date.now()}`;
      setCatImage({ url: imageUrl, id: Date.now() });
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      if (controller.signal === abortRef.current?.signal) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewCat();
    return () => abortRef.current?.abort();
  }, [fetchNewCat]);

  return { catImage, loading, error, fetchNewCat };
};