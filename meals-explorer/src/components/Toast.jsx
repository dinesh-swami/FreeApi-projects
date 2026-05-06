import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <span>✅</span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;