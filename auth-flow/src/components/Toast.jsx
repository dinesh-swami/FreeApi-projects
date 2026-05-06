import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type === 'error' ? 'error' : ''}`}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;