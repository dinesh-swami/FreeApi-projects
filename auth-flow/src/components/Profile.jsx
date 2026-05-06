import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

const Profile = ({ setCurrentPage }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      setCurrentPage('login');
    }
  }, [user, loading, setCurrentPage]);

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="main-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.avatar?.url ? (
            <img src={user.avatar.url} alt={user.username} style={{ width: '100px', borderRadius: '50%' }} />
          ) : (
            <span>👤</span>
          )}
        </div>
        <h2 className="profile-name">{user.fullName || user.username}</h2>
        <p className="profile-username">@{user.username}</p>
        <p className="profile-email">{user.email}</p>
        <div className="profile-role">{user.role || 'User'}</div>
        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Member since: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;