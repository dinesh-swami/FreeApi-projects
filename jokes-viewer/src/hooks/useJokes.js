// src/hooks/useJokes.js
import { useState, useCallback, useEffect, useRef } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/randomjokes';

// Helper function to extract joke content from different API response structures
const extractJokeContent = (data) => {
  if (!data) return "No joke content available";
  
  // Handle different possible response structures
  if (data.content) return data.content;
  if (data.joke) return data.joke;
  if (data.text) return data.text;
  if (data.value) return data.value;
  if (data.jokeText) return data.jokeText;
  
  // Handle array responses
  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0];
    if (firstItem.content) return firstItem.content;
    if (firstItem.joke) return firstItem.joke;
    if (firstItem.text) return firstItem.text;
  }
  
  // Handle nested data property
  if (data.data) {
    if (data.data.content) return data.data.content;
    if (data.data.joke) return data.data.joke;
    if (Array.isArray(data.data) && data.data[0]?.content) return data.data[0].content;
  }
  
  return "Here's a funny joke for you! 😄";
};

const useJokes = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchNewJoke = useCallback(async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        signal: abortController.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Extract joke content based on API response structure
      let jokeContent;
      if (result.statusCode === 200 && result.data) {
        jokeContent = extractJokeContent(result.data);
      } else if (result.success && result.data) {
        jokeContent = extractJokeContent(result.data);
      } else {
        jokeContent = extractJokeContent(result);
      }
      
      setJoke({
        content: jokeContent,
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now()
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch joke. Please try again.');
        console.error('Joke fetch error:', err);
      }
    } finally {
      if (abortController.signal === abortControllerRef.current?.signal) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchNewJoke();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchNewJoke]);

  return { joke, loading, error, fetchNewJoke };
};

export default useJokes;