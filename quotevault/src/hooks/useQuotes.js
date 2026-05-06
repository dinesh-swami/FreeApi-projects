import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://api.freeapi.app/api/v1/public/quotes';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_BASE}?page=${page}&limit=10`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        let filtered = data.data.data;

        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(q =>
            q.content.toLowerCase().includes(term) ||
            q.author.toLowerCase().includes(term)
          );
        }

        if (selectedTag) {
          filtered = filtered.filter(q => 
            q.tags && q.tags.includes(selectedTag)
          );
        }

        setQuotes(filtered);
        setTotalPages(data.data.totalPages || 30);
      }
    } catch (err) {
      setError('Failed to load quotes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedTag]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return {
    quotes,
    loading,
    error,
    page,
    setPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    fetchQuotes
  };
};