import React, { useState } from 'react';
import Loader from './Loader';
import Toast from './Toast';

const JokeCard = ({ joke, loading, error, onNewJoke }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopyJoke = async () => {
    if (!joke || !joke.content) return;
    
    try {
      await navigator.clipboard.writeText(joke.content);
      setToastMessage('Joke copied to clipboard! ✨');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setToastMessage('Failed to copy 😔');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleNewJoke = () => {
    onNewJoke();
  };

  return (
    <div className="joke-card-container">
      <div className="joke-card">
        <div className="joke-card-header">
          <div className="joke-icon">😄</div>
          <span className="joke-label">Random Joke</span>
        </div>

        <div className="joke-content-wrapper">
          {loading ? (
            <div className="joke-loading">
              <Loader />
              <p>Fetching a fresh joke...</p>
            </div>
          ) : error ? (
            <div className="joke-error">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={handleNewJoke}>
                Try Again
              </button>
            </div>
          ) : joke ? (
            <div className="joke-text-container">
              <p className="joke-text">{joke.content}</p>
              {joke.timestamp && (
                <span className="joke-timestamp">Fetched at: {joke.timestamp}</span>
              )}
            </div>
          ) : (
            <div className="joke-empty">
              <p>No joke available. Click the button to get one!</p>
            </div>
          )}
        </div>

        <div className="joke-card-actions">
          <button 
            className="action-button copy-button"
            onClick={handleCopyJoke}
            disabled={loading || error || !joke}
            title="Copy to clipboard"
          >
            <span className="btn-icon">📋</span>
            <span>Copy</span>
          </button>
          <button 
            className="action-button new-button"
            onClick={handleNewJoke}
            disabled={loading}
            title="Get new joke"
          >
            <span className="btn-icon">🔄</span>
            <span>{loading ? 'Loading...' : 'New Joke'}</span>
          </button>
        </div>
      </div>

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default JokeCard;