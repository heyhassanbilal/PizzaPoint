import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function CategoriesList() {
  const [activeSection, setActiveSection] = useState("PIZZA");
  const observerRef = useRef(null);

  // Function to handle clicking on a menu item
  const handleMenuClick = (sectionId, e) => {
    e.preventDefault();
    // Temporarily disable observer to prevent conflict with scroll
    if (observerRef.current) {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observerRef.current.unobserve(section);
      });
    }

    setActiveSection(sectionId);

    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    // Re-enable observer after a delay
    setTimeout(() => {
      if (observerRef.current) {
        sections.forEach((id) => {
          const section = document.getElementById(id);
          if (section) observerRef.current.observe(section);
        });
      }
    }, 1000);
  };

  const sections = ["PIZZA", "DRINKS", "BURGER", "FRIES_NUGGETS", "CALZONE"];

  // Function to check which section is in view and update active state
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Adjust these values as needed
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
      <ul className="sticky top-0 z-20 scroll_height h-14 pr-2 pl-2 flex flex-nowrap items-center justify-start sm:justify-center space-x-4 sm:space-x-8 md:space-x-16 lg:space-x-28 overflow-x-auto bg-red-600 text-white scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-500">
        <li className="flex-none text-nowrap">
          <a
            href="#PIZZA"
            onClick={(e) => handleMenuClick("PIZZA", e)}
            className={`px-2 sm:px-3 md:px-4 cursor-pointer rounded-lg py-1 sm:py-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${
              activeSection === "PIZZA"
                ? "bg-white text-brandRed"
                : "hover:bg-white hover:text-brandRed"
            }`}
          >
            <span className="hidden sm:inline">Classic </span>Pizza
          </a>
        </li>
        <li className="flex-none text-nowrap">
          <a
            href="#DRINKS"
            onClick={(e) => handleMenuClick("DRINKS", e)}
            className={`px-2 sm:px-3 md:px-4 cursor-pointer rounded-lg py-1 sm:py-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${
              activeSection === "DRINKS"
                ? "bg-white text-brandRed"
                : "hover:bg-white hover:text-brandRed"
            }`}
          >
            <span className="hidden sm:inline">Beverages</span>
            <span className="sm:hidden">Drinks</span>
          </a>
        </li>
        <li className="flex-none text-nowrap">
          <a
            href="#BURGER"
            onClick={(e) => handleMenuClick("BURGER", e)}
            className={`px-2 sm:px-3 md:px-4 cursor-pointer rounded-lg py-1 sm:py-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${
              activeSection === "BURGER"
                ? "bg-white text-brandRed"
                : "hover:bg-white hover:text-brandRed"
            }`}
          >
            Burgers
          </a>
        </li>
        <li className="flex-none text-nowrap">
          <a
            href="#FRIES_NUGGETS"
            onClick={(e) => handleMenuClick("FRIES_NUGGETS", e)}
            className={`px-2 sm:px-3 md:px-4 cursor-pointer rounded-lg py-1 sm:py-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${
              activeSection === "FRIES_NUGGETS"
                ? "bg-white text-brandRed"
                : "hover:bg-white hover:text-brandRed"
            }`}
          >
            Fries
          </a>
        </li>
        <li className="flex-none text-nowrap">
          <a
            href="#CALZONE"
            onClick={(e) => handleMenuClick("CALZONE", e)}
            className={`px-2 sm:px-3 md:px-4 cursor-pointer rounded-lg py-1 sm:py-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${
              activeSection === "CALZONE"
                ? "bg-white text-brandRed"
                : "hover:bg-white hover:text-brandRed"
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
