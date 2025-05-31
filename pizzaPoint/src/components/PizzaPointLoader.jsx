import React from 'react';

const PizzaPointLoader = ({ isLoading = true, isVisible = true }) => {
  const shouldShow = isLoading !== undefined ? isLoading : isVisible;

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <style jsx>{`
        @keyframes pizzaSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pizza-spinner {
          animation: pizzaSpin 2s linear infinite;
        }

        .pizza-slice {
          position: absolute;
          width: 50%;
          height: 50%;
          transform-origin: 100% 100%;
          overflow: hidden;
        }

        .pizza-slice::before {
          content: '';
          position: absolute;
          width: 141.42%;
          height: 141.42%;
          background: linear-gradient(45deg, #dc2626, #f59e0b);
          border-radius: 50%;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
        }

        .slice-1 { transform: rotate(0deg); }
        .slice-2 { transform: rotate(45deg); }
        .slice-3 { transform: rotate(90deg); }
        .slice-4 { transform: rotate(135deg); }
        .slice-5 { transform: rotate(180deg); }
        .slice-6 { transform: rotate(225deg); }
        .slice-7 { transform: rotate(270deg); }
        .slice-8 { transform: rotate(315deg); }

        .slice-line {
          position: absolute;
          width: 50%;
          height: 2px;
          background: rgba(139, 69, 19, 0.3);
          transform-origin: 100% 50%;
        }

        .crust {
          position: absolute;
          inset: -4px;
          border: 8px solid #8B4513;
          border-radius: 50%;
          background: transparent;
        }
      `}</style>

      {/* Detailed rotating pizza */}
      <div className="pizza-spinner w-32 h-32 relative">
        {/* Pizza crust */}
        <div className="crust"></div>
        
        {/* Pizza base with slices */}
        <div 
          className="w-full h-full rounded-full relative shadow-2xl"
          style={{
            background: 'linear-gradient(45deg, #dc2626, #f59e0b)',
            boxShadow: '0 15px 40px rgba(220, 38, 38, 0.5)'
          }}
        >
          {/* Slice divider lines */}
          <div className="slice-line" style={{ transform: 'rotate(0deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(45deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(90deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(135deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(180deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(225deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(270deg)' }} />
          <div className="slice-line" style={{ transform: 'rotate(315deg)' }} />

          {/* Pepperoni scattered across slices */}
          <div className="absolute w-4 h-4 bg-red-900 rounded-full shadow-sm" style={{ top: '20%', left: '35%' }} />
          <div className="absolute w-3 h-3 bg-red-900 rounded-full shadow-sm" style={{ top: '45%', left: '65%' }} />
          <div className="absolute w-5 h-5 bg-red-900 rounded-full shadow-sm" style={{ top: '70%', left: '30%' }} />
          <div className="absolute w-4 h-4 bg-red-900 rounded-full shadow-sm" style={{ top: '35%', left: '15%' }} />
          <div className="absolute w-3 h-3 bg-red-900 rounded-full shadow-sm" style={{ top: '75%', left: '75%' }} />
          <div className="absolute w-4 h-4 bg-red-900 rounded-full shadow-sm" style={{ top: '55%', left: '20%' }} />
          <div className="absolute w-3 h-3 bg-red-900 rounded-full shadow-sm" style={{ top: '25%', left: '70%' }} />
          <div className="absolute w-5 h-5 bg-red-900 rounded-full shadow-sm" style={{ top: '60%', left: '55%' }} />
          
          {/* Cheese strings */}
          <div className="absolute w-6 h-2 bg-yellow-300 rounded-full shadow-sm" style={{ top: '40%', left: '45%' }} />
          <div className="absolute w-4 h-2 bg-yellow-300 rounded-full shadow-sm" style={{ top: '55%', left: '35%' }} />
          <div className="absolute w-5 h-2 bg-yellow-300 rounded-full shadow-sm" style={{ top: '30%', left: '25%' }} />
          <div className="absolute w-4 h-2 bg-yellow-300 rounded-full shadow-sm" style={{ top: '65%', left: '65%' }} />
          <div className="absolute w-3 h-2 bg-yellow-300 rounded-full shadow-sm" style={{ top: '50%', left: '75%' }} />

          {/* Green herbs/basil */}
          <div className="absolute w-2 h-3 bg-green-600 rounded-full shadow-sm" style={{ top: '35%', left: '55%' }} />
          <div className="absolute w-2 h-2 bg-green-600 rounded-full shadow-sm" style={{ top: '65%', left: '45%' }} />
          <div className="absolute w-2 h-3 bg-green-600 rounded-full shadow-sm" style={{ top: '45%', left: '25%' }} />
          <div className="absolute w-2 h-2 bg-green-600 rounded-full shadow-sm" style={{ top: '25%', left: '45%' }} />

          {/* Center highlight */}
          <div 
            className="absolute w-8 h-8 rounded-full"
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default PizzaPointLoader;