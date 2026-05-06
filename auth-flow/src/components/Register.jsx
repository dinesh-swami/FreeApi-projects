import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';
import Toast from './Toast';

const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });
  const { register, authLoading, error, clearError } = useAuth();
  const [toastMsg, setToastMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const success = await register(formData);
    if (success) {
      setToastMsg('✅ Registration successful!');
      setTimeout(() => {
        setToastMsg(null);
        setCurrentPage('profile');
      }, 1000);
    } else {
      setToastMsg('❌ Registration failed. Try again.');
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="main-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join AuthFlow today</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="johndoe"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="input-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="auth-button" disabled={authLoading}>
            {authLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account?{' '}
          <button onClick={() => setCurrentPage('login')}>Sign In</button>
        </div>
      </div>
      {authLoading && <Loader />}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      {error && !toastMsg && <Toast message={error} type="error" onClose={clearError} />}
    </div>
  );
};

export default Register;