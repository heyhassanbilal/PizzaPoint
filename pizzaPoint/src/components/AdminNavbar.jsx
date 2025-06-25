import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";

function AdminNavbar({isOpen}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, setIsAuthenticated } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { cart, loading } = useCart();
  const [isOpen, setIsOpen] = useState(isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    logout();
    navigate("/adminLogin");
  };

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
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

  const handleSetIsOpen = async () => {
    try {
      const response = await authService.openRestaurant(!isOpen);
      setIsOpen((p) => !p);
    } catch (error) {
      console.error("Error updating restaurant status:", error);
    }
  }

  return (
    <>
      <nav className="fixed top-0 w-full h-16 flex bg-white border-b-2 ">
        <div className="ml-24 mt-4">
          <h1 className="font-semibold text-2xl text-black">Dashboard</h1>
        </div>

        <div className="w-full flex gap-2 justify-end mt-1">
          <div
            className={`${
              isOpen ? "bg-black" : "bg-gray-600"
            } mt-1 w-32 mr-2 h-11 rounded-2xl text-center hover:cursor-pointer hover:scale-105`}
            onClick={() => handleSetIsOpen()}
          >
            <p className="text-2xl text-white pt-1">
              {isOpen ? "Opened" : "Closed"}
            </p>
          </div>

          <div className="w-10 h-10 mt-1 pt-2 rounded-full text-center">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                ref={buttonRef}
                className="hidden sm:block text-black rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                aria-label="User menu"
              >
                <i className="fa-regular fa-user fa-lg sm:fa-2xl"></i>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/adminLogin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-brandRed hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className="w-10 h-10 mr-5 mt-1 pl-3 bg-black rounded-lg flex-col  hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="w-3/5 h-[3px] bg-white mb-1 rounded-sm"></div>
            <div className="w-3/5 h-[3px] bg-white mb-1 rounded-sm"></div>
            <div className="w-3/5 h-[3px] bg-white rounded-sm"></div>
          </button>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
