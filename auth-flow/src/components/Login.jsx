import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';
import Toast from './Toast';

const Login = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, authLoading, error, clearError } = useAuth();
  const [toastMsg, setToastMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const success = await login({ username, password });
    if (success) {
      setToastMsg('✅ Login successful!');
      setTimeout(() => {
        setToastMsg(null);
        setCurrentPage('profile');
      }, 1000);
    } else {
      setToastMsg('❌ Login failed. Check credentials.');
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="main-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="johndoe"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-button" disabled={authLoading}>
            {authLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('register')}>Create one</button>
        </div>
      </div>
      {authLoading && <Loader />}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      {error && !toastMsg && <Toast message={error} type="error" onClose={clearError} />}
    </div>
  );
};

export default Login;