import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      <span className="toast-icon">✅</span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;