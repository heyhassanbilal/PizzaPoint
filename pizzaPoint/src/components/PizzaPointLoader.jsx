import React from 'react';

const PizzaPointLoader = ({ isLoading = true, isVisible = true }) => {
  const shouldShow = isLoading !== undefined ? isLoading : isVisible;

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Pizza GIF centered */}
      <img 
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2IiBmaWxsPSIjRkZEQjk0Ii8+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjI0IiBmaWxsPSIjQzQxRTNBIi8+CjxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjAwIiBmaWxsPSIjRkZFNDc2Ii8+CjwhLS0gUGVwcGVyb25pIC0tPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxODAiIHI9IjE4IiBmaWxsPSIjOEIyNjM1Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjI0MCIgcj0iMTYiIGZpbGw9IiM4QjI2MzUiLz4KPGR1c2UgcmVwZWF0PXsyfSBkdXI9ezJ9IGJlZ2luPXswfSBhdHRyaWJ1dGVOYW1lPXsiciJ9IHZhbHVlcz17IjE2OzIwOzE2In0vPgo8L2NpcmNsZT4KPGD2CjwvZGVmcz4KPHN2Zz4K" 
        alt="Pizza Loading" 
        className="w-32 h-32"
      />
    </div>
  );
};

export default PizzaPointLoader;