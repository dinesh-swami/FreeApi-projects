import { useState, useCallback, useRef, useEffect } from 'react';

const CAT_API = 'https://api.thecatapi.com/v1/images/search';

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
      const res = await fetch(CAT_API, { signal: controller.signal });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data && data[0] && data[0].url) {
        setCatImage({ url: data[0].url, id: Date.now() });
      } else {
        throw new Error('No image URL');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        // Fallback to cute placeholder
        setCatImage({ url: 'https://cataas.com/cat', id: Date.now() });
      }
    } finally {
      if (controller.signal === abortRef.current?.signal) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchNewCat();
    return () => abortRef.current?.abort();
  }, [fetchNewCat]);

  return { catImage, loading, error, fetchNewCat };
};