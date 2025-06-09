import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/imgs/logo.png";
import cartLogo from "../assets/imgs/cart-shopping.png";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";

function Navbar({ setIsCartOpen, setSideMenuOpen }) {
  const { cart, loading } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, setIsAuthenticated } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // const [isAuthenticated, setIsLoggedIn] = useState(isAuthenticated);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //       const result = await isAuthenticated();
  //       setIsLoggedIn(result);
  //       console.log("User is authenticated:", result);
  //   };
  //   checkAuth();
  //   }, []);

  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    logout();
  };
  const handleMyOrders = () => {
    setIsMenuOpen(false);
    navigate("/orders");
  };

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // More aggressive scroll handler
    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    // Use both scroll and touchmove for mobile devices
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  // const handleLogoClick = (e) => {
  //   // Only prevent default if we need to override
  //   if (location.state?.from) {
  //     e.preventDefault();
  //     navigate("/", { 
  //       replace: true,
  //       state: null // Clear navigation state
  //     });
  //   }
  //   // Otherwise let the Link handle it normally
  // };

  const handleLogoClick = (e) => {
  if (location.pathname === "/") {
    e.preventDefault();
    window.location.reload(); // Reload the page
  } else {
    // Optional: clear state and navigate if you’re using route state elsewhere
    navigate("/", { state: null });
  }
};

  return (
    <nav className="w-full py-2 px-2 md:px-4 flex items-center justify-between relative z-20">
      {/* Left Side - Location & Phone */}
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <button
          className="flex items-center h-8 px-2 sm:px-3 bg-red-600 text-white text-xs sm:text-sm rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={() => navigate("/address")}
        >
          <i className="fa-solid fa-location-dot mr-1 sm:mr-2"></i>
          <span className="hidden sm:inline">Change Location</span>
        </button>

        <a 
          href="tel:+36204489524"
          className="flex items-center h-8 px-2 sm:px-3 bg-red-600 text-white text-xs sm:text-sm rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <i className="fa-solid fa-phone mr-1"></i>
          <span className="truncate hidden lg:inline">+36204489524</span>
        </a>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-10">
        <Link to="/" onClick={handleLogoClick}>
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full transition duration-300 ease-in-out hover:blur-[1px] motion-safe:hover:blur-[1px]">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Right Side - User, Cart, Menu */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={buttonRef}
            className="hidden sm:flex w-9 h-9 items-center justify-center text-brandRed rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            aria-label="User menu"
          >
            <i className="fa-regular fa-user fa-lg sm:fa-2xl"></i>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brandRed hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brandRed hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brandRed hover:text-white"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleMyOrders}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brandRed hover:text-white"
                  >
                    My Orders
                  </button>

      
                </>
              )}
            </div>
          )}
        </div>

        {isAuthenticated && (
          <button
            className="relative w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping cart"
          >
            <img
              src={cartLogo}
              alt="Cart"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain hover:blur-[1px] transition duration-300 ease-in-out"
            />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart && cart.cartItems ? cart.cartItems.length : 0}
            </span>
          </button>
        )}

        <button
          className="w-9 h-9 bg-red-600 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={() => setSideMenuOpen(true)}
          aria-label="Menu"
        >
          <div className="w-4 h-[2px] bg-white mb-1 rounded-sm"></div>
          <div className="w-4 h-[2px] bg-white mb-1 rounded-sm"></div>
          <div className="w-4 h-[2px] bg-white rounded-sm"></div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;