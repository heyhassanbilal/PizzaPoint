import React, { useEffect, useState } from 'react';

const CustomAlert = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after `duration` ms
    const timer = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    // Trigger parent close after fade-out
    if (!visible) {
      const timer = setTimeout(() => onClose(), 300); // match fade-out duration
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 w-[650px] px-6 py-4 rounded-2xl shadow-lg flex items-center justify-between transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      } bg-red-600 text-white`}
    >
      <span className="w-full text-center text-sm font-medium">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-white hover:text-red-200 text-xl leading-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default CustomAlert;
