import { useState, useEffect, useCallback, useRef } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/meals';

const extractMealsArray = (data) => {
  if (!data) return [];
  if (data.data && Array.isArray(data.data)) return data.data;
  if (Array.isArray(data)) return data;
  if (data.data && data.data.data && Array.isArray(data.data.data)) return data.data.data;
  return [];
};

const useMeals = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchMeals = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const meals = extractMealsArray(json);
      if (meals.length === 0) throw new Error('No meals found');
      setAllMeals(meals);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message || 'Failed to load meals');
    } finally {
      if (controller.signal === abortRef.current?.signal) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
    return () => abortRef.current?.abort();
  }, [fetchMeals]);

  return { allMeals, loading, error, refetch: fetchMeals };
};

export default useMeals;