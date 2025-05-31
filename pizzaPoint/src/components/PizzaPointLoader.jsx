import React from 'react';

const PizzaPointLoader = ({ isLoading = true, isVisible = true }) => {
  const shouldShow = isLoading !== undefined ? isLoading : isVisible;

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-600">
      <style jsx>{`
        @keyframes pizzaSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pizza-spinner {
          animation: pizzaSpin 2s linear infinite;
        }
      `}</style>

      {/* Simple rotating pizza */}
      <div className="pizza-spinner w-24 h-24 relative">
        <div 
          className="w-full h-full rounded-full relative shadow-lg"
          style={{
            background: 'linear-gradient(45deg, #dc2626, #f59e0b)',
            boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)'
          }}
        >
          {/* Pepperoni toppings */}
          <div className="absolute w-4 h-4 bg-red-800 rounded-full" style={{ top: '25%', left: '30%' }} />
          <div className="absolute w-3 h-3 bg-red-800 rounded-full" style={{ top: '50%', left: '60%' }} />
          <div className="absolute w-5 h-5 bg-red-800 rounded-full" style={{ top: '65%', left: '25%' }} />
          <div className="absolute w-4 h-4 bg-red-800 rounded-full" style={{ top: '40%', left: '15%' }} />
          <div className="absolute w-3 h-3 bg-red-800 rounded-full" style={{ top: '70%', left: '70%' }} />
          
          {/* Cheese */}
          <div className="absolute w-5 h-2 bg-yellow-400 rounded-lg" style={{ top: '40%', left: '45%' }} />
          <div className="absolute w-4 h-2 bg-yellow-400 rounded-lg" style={{ top: '55%', left: '35%' }} />
        </div>
      </div>
    </div>
  );
};

export default PizzaPointLoader;