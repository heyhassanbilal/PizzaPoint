import React from "react";
import pizza from "../assets/imgs/pizza.gif"; // Assuming you have a pizza GIF in your assets
const PizzaPointLoader = ({ isLoading = true, isVisible = true }) => {
  const shouldShow = isLoading !== undefined ? isLoading : isVisible;

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Pizza GIF centered */}
      <img src={pizza} alt="Pizza Loading" className="w-32 h-32" />
    </div>
  );
};

export default PizzaPointLoader;
