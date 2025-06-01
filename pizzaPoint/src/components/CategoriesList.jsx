import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function CategoriesList() {
  const [activeSection, setActiveSection] = useState("PIZZA");
  const observerRef = useRef(null);

  // Simplified function to handle clicking on a menu item
  const handleMenuClick = (sectionId, e) => {
    e.preventDefault();
    
    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      // Use a more mobile-friendly scroll approach
      const headerOffset = 60; // Account for sticky header height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Force update the active section after a brief moment to ensure clean transition
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 150);
    }
  };

  const sections = ["PIZZA", "DRINKS", "BURGER", "FRIES_NUGGETS", "CALZONE"];

  // Function to check which section is in view and update active state
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // Adjusted for better mobile experience
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    observerRef.current = observer;

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <>
      <ul 
        className="sticky top-0 z-20 scroll_height h-12 sm:h-14 px-3 sm:px-4 flex flex-nowrap items-center justify-start sm:justify-center overflow-x-auto bg-red-600 text-white scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-500 shadow-md"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      >
        <li className="flex-shrink-0">
          <a
            href="#PIZZA"
            onClick={(e) => handleMenuClick("PIZZA", e)}
            className={`inline-block px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base font-medium whitespace-nowrap ${
              activeSection === "PIZZA"
                ? "bg-white text-red-600 shadow-sm"
                : "hover:bg-white/20 active:bg-white/30"
            }`}
          >
            <span className="hidden sm:inline">Classic </span>Pizza
          </a>
        </li>
        
        <li className="flex-shrink-0 ml-0 sm:ml-4 md:ml-6 lg:ml-8">
          <a
            href="#DRINKS"
            onClick={(e) => handleMenuClick("DRINKS", e)}
            className={`inline-block px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base font-medium whitespace-nowrap ${
              activeSection === "DRINKS"
                ? "bg-white text-red-600 shadow-sm"
                : "hover:bg-white/20 active:bg-white/30"
            }`}
          >
            <span className="hidden sm:inline">Beverages</span>
            <span className="sm:hidden">Drinks</span>
          </a>
        </li>
        
        <li className="flex-shrink-0 ml-2 sm:ml-4 md:ml-6 lg:ml-8">
          <a
            href="#BURGER"
            onClick={(e) => handleMenuClick("BURGER", e)}
            className={`inline-block px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base font-medium whitespace-nowrap ${
              activeSection === "BURGER"
                ? "bg-white text-red-600 shadow-sm"
                : "hover:bg-white/20 active:bg-white/30"
            }`}
          >
            Burgers
          </a>
        </li>
        
        <li className="flex-shrink-0 ml-2 sm:ml-4 md:ml-6 lg:ml-8">
          <a
            href="#FRIES_NUGGETS"
            onClick={(e) => handleMenuClick("FRIES_NUGGETS", e)}
            className={`inline-block px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base font-medium whitespace-nowrap ${
              activeSection === "FRIES_NUGGETS"
                ? "bg-white text-red-600 shadow-sm"
                : "hover:bg-white/20 active:bg-white/30"
            }`}
          >
            <span className="hidden sm:inline">Fries & </span>Nuggets
          </a>
        </li>
        
        <li className="flex-shrink-0 ml-2 sm:ml-4 md:ml-6 lg:ml-8">
          <a
            href="#CALZONE"
            onClick={(e) => handleMenuClick("CALZONE", e)}
            className={`inline-block px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base font-medium whitespace-nowrap ${
              activeSection === "CALZONE"
                ? "bg-white text-red-600 shadow-sm"
                : "hover:bg-white/20 active:bg-white/30"
            }`}
          >
            Calzone
          </a>
        </li>
      </ul>
    </>
  );
}

export default CategoriesList;