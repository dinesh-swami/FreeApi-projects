import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Use proxy path instead of direct URL
const API_BASE = '/api/api/v1/users';
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  };

  const fetchCurrentUser = useCallback(async () => {
    try {
      const data = await apiCall('/current-user');
      if (data.data) setUser(data.data);
      else setUser(null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const register = async (userData) => {
    setAuthLoading(true);
    setError(null);
    try {
      await apiCall('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      await login({ username: userData.username, password: userData.password });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (credentials) => {
    setAuthLoading(true);
    setError(null);
    try {
      await apiCall('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      await fetchCurrentUser();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await apiCall('/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const value = {
    user,
    loading,
    authLoading,
    error,
    register,
    login,
    logout,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};