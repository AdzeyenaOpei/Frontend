// src/components/Notification.js
import React from 'react';

function Notification({ message, type }) {
  if (!message) return null;

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded ${styles[type]} shadow-lg`}
    >
      {message}
    </div>
  );
}

export default Notification;
