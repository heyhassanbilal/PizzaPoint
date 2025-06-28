import React, { useEffect, useState } from "react";
import bg1 from "../assets/imgs/bg1.jpeg";
import bg2 from "../assets/imgs/bg2.jpeg";
import bg3 from "../assets/imgs/bg3.jpeg";
// import bg4 from "../assets/imgs/bg4.webp";

function BackgroundDeals() {
  const bg = [bg1, bg2, bg3];
  const [currentBgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % bg.length); // Cycle through images
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [bg.length]);

  return (
    <div className="w-screen h-[calc(40vw_-_1px)] bg-red-950 z-0 overflow-hidden">
      <div
        className="w-full h-full flex z-0 relative transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentBgIndex * 100}%)`, // Slide effect
        }}
      >
        {bg.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Background ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>

    
  );
}

export default BackgroundDeals;
