import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = ({ setCurrentPage, currentPage }) => {
  const { user, logout, authLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    setCurrentPage('login');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setCurrentPage('login')} style={{ cursor: 'pointer' }}>
        <span>🔐</span>
        <span>AuthFlow</span>
      </div>
      <div className="nav-links">
        <ThemeSwitcher />
        {user ? (
          <>
            <span style={{ color: 'white' }}>👋 {user.username}</span>
            <button
              className="nav-btn logout-btn"
              onClick={handleLogout}
              disabled={authLoading}
            >
              {authLoading ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <button
              className={`nav-btn ${currentPage === 'login' ? 'active' : ''}`}
              onClick={() => setCurrentPage('login')}
            >
              Login
            </button>
            <button
              className={`nav-btn ${currentPage === 'register' ? 'active' : ''}`}
              onClick={() => setCurrentPage('register')}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;