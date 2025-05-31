import React, { useState, useEffect } from 'react';

const PizzaPointLoader = ({ isVisible = true }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const messages = [
    "Preparing your delicious experience...",
    "Heating up the ovens...",
    "Selecting the finest ingredients...",
    "Crafting the perfect pizza...",
    "Almost ready to serve!"
  ];

  useEffect(() => {
    if (!isVisible) return;

    const updateProgress = () => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        const newMessageIndex = Math.floor((newProgress / 100) * messages.length);
        if (newMessageIndex < messages.length) {
          setMessageIndex(newMessageIndex);
        }
        return newProgress;
      });
    };

    const interval = setInterval(updateProgress, 300 + Math.random() * 500);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes containerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes pizzaSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes toppingBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes textGlow {
          from { text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2); }
          to { text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 255, 255, 0.4); }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes progressMove {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes progressGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 107, 53, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.8); }
        }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) { 
          width: 20px; height: 20px; top: 20%; left: 20%; animation-delay: 0s; 
        }
        .particle:nth-child(2) { 
          width: 15px; height: 15px; top: 60%; left: 80%; animation-delay: 2s; 
        }
        .particle:nth-child(3) { 
          width: 25px; height: 25px; top: 80%; left: 30%; animation-delay: 4s; 
        }
        .particle:nth-child(4) { 
          width: 18px; height: 18px; top: 30%; left: 70%; animation-delay: 1s; 
        }
        .particle:nth-child(5) { 
          width: 22px; height: 22px; top: 70%; left: 10%; animation-delay: 3s; 
        }

        .loading-container {
          animation: containerPulse 3s ease-in-out infinite;
        }

        .pizza-logo {
          animation: pizzaSpin 4s linear infinite;
        }

        .pizza-topping {
          animation: toppingBounce 2s ease-in-out infinite;
        }

        .pepperoni1 { animation-delay: 0.5s; }
        .pepperoni2 { animation-delay: 1s; }
        .pepperoni3 { animation-delay: 1.5s; }
        .cheese { animation-delay: 0.8s; }

        .brand-name {
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .loading-text {
          animation: fadeInOut 2s ease-in-out infinite;
        }

        .progress-bar {
          animation: progressMove 2s ease-in-out infinite, progressGlow 3s ease-in-out infinite;
        }

        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        .dot:nth-child(3) { animation-delay: 0s; }

        .dot {
          animation: dotBounce 1.4s ease-in-out infinite both;
        }
      `}</style>

      {/* Red gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 25%, #991b1b 50%, #7f1d1d 100%)'
        }}
      />

      {/* Background particles */}
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />

      {/* Main loading content */}
      <div 
        className="loading-container relative z-10 text-center bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white border-opacity-20"
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x / 20}deg) rotateX(${-mousePosition.y / 20}deg)`,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Animated pizza logo */}
        <div className="pizza-logo w-24 h-24 md:w-30 md:h-30 mx-auto mb-8 relative">
          <div 
            className="pizza-base w-full h-full rounded-full relative shadow-lg"
            style={{
              background: 'linear-gradient(45deg, #dc2626, #f59e0b)',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)'
            }}
          >
            <div 
              className="pizza-topping pepperoni1 absolute w-4 h-4 bg-red-800 rounded-full"
              style={{ top: '25%', left: '30%' }}
            />
            <div 
              className="pizza-topping pepperoni2 absolute w-3 h-3 bg-red-800 rounded-full"
              style={{ top: '50%', left: '60%' }}
            />
            <div 
              className="pizza-topping pepperoni3 absolute w-5 h-5 bg-red-800 rounded-full"
              style={{ top: '65%', left: '25%' }}
            />
            <div 
              className="pizza-topping cheese absolute w-5 h-2 bg-yellow-400 rounded-lg"
              style={{ top: '40%', left: '45%' }}
            />
          </div>
        </div>

        {/* Brand name */}
        <h1 
          className="brand-name text-4xl md:text-5xl font-bold text-white mb-5"
          style={{
            textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          PizzaPoint
        </h1>

        {/* Loading message */}
        <p className="loading-text text-lg md:text-xl text-white text-opacity-90 mb-8">
          {messages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="progress-container w-64 md:w-80 h-2 bg-white bg-opacity-20 rounded-full mx-auto overflow-hidden relative">
          <div 
            className="progress-bar h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #dc2626, #f59e0b, #dc2626)',
              backgroundSize: '200% 100%'
            }}
          />
        </div>

        {/* Loading dots */}
        <div className="loading-dots flex justify-center gap-2 mt-5">
          <div className="dot w-3 h-3 bg-white bg-opacity-80 rounded-full" />
          <div className="dot w-3 h-3 bg-white bg-opacity-80 rounded-full" />
          <div className="dot w-3 h-3 bg-white bg-opacity-80 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PizzaPointLoader;