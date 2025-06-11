import React, { useEffect, useRef, useState } from "react";
import serve6 from "../assets/imgs/serve6.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../utils/CartContext";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { productService } from "../utils/services";

function YourCart({
  cartItems,
  popularItems,
  setCartItems,
  isOpen,
  onClose,
  setIsCartOpen,
}) {
  const { email, token, isAuthenticated } = useAuth();
  const { cart, updateCart, addToCart } = useCart();
  const containerRef = useRef(null);
  const [drinks, setDrinks] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchDrinks() {
      try {
        const response = await productService.getProductByCategory("DRINKS");
        setDrinks((prevData) => [...response]);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Error fetching data:", error.message);
        }
      }
    }

    fetchDrinks();
    return () => controller.abort();
  }, [token]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [drinks]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Cart */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 right-0 w-screen sm:w-[23rem] h-full bg-white rounded-l-xl z-50 overflow-y-auto flex flex-col"
      >
        {/* Heading */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium p-5">Your Cart</h1>
          <button
            className="self-center mr-4 text-2xl w-7 h-7 bg-brandRed text-white rounded-full hover:bg-red-700 transition-colors"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="w-full">
          {cart &&
            cart.cartItems &&
            cart.cartItems.map((item) =>
              item.quantity === 0 ? null : (
                <div className="border-b-2" key={item.cartItemid}>
                  <div className="flex p-5 justify-around">
                    <div className="w-16 h-16 mr-2">
                      <img
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        className="h-full w-full object-cover rounded-md shadow-lg"
                      />
                    </div>
                    <div className="w-32 shrink self-center">
                      <h1 className="text-md">{item.menuItem.name}</h1>
                    </div>
                    <div className="flex w-24 h-8 ml-2 self-center justify-evenly text-brandRed border-brandRed border-2 rounded-3xl">
                      <button
                        onClick={() =>
                          updateCart(item.cartItemId, item.quantity - 1)
                        }
                        className="hover:bg-gray-100 px-1 rounded-l-full"
                      >
                        {item.quantity === 1 ? (
                          <i className="fa-solid fa-trash"></i>
                        ) : (
                          <i className="fa-solid fa-minus"></i>
                        )}
                      </button>
                      <h4 className="">{item.quantity}</h4>
                      <button
                        onClick={() =>
                          updateCart(item.cartItemId, item.quantity + 1)
                        }
                        className="hover:bg-gray-100 px-1 rounded-r-full"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex">
                      <h3 className="text-xs ml-6 text-gray-600">
                        {item.extras
                          .map((extra) => `${extra.name}(${extra.price} HUF)`)
                          .join(", ")}
                      </h3>
                    </div>
                    <h1 className="text-end text-sm font-semibold mb-3 mr-2">
                      {item.totalPrice} HUF
                    </h1>
                  </div>
                </div>
              )
            )}
        </div>

        {/* Add more Items */}
        <div
          className="p-5 hover:cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          <h3 className="text-gray-500">+ Add more items</h3>
        </div>

        {/* Popular Items */}
        <div className="p-5 border-b-2 relative">
          <div className="flex justify-between mb-3">
            <div className="shrink">
              <h3 className="text-sm font-medium">Popular Items</h3>
              <h3 className="text-xs text-gray-500">
                Customers often buy these together
              </h3>
            </div>
            <div className="shrink-0 flex">
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="mr-2 w-7 h-7 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>
              )}
              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="w-7 h-7 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </button>
              )}
            </div>
          </div>

          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth scrollbar-none gap-3 pb-2"
          >
            {drinks.map((item) => (
              <div key={item.id} className="flex flex-col p-3 flex-shrink-0">
                <div className="relative w-[120px] h-[120px] border-2 border-gray-300 rounded-lg">
                  <img
                    src={item.imageUrl || serve6}
                    alt={item.name}
                    className="h-full w-full object-contain rounded-lg"
                  />
                  <button
                    onClick={() => addToCart(item.id, 1, null)}
                    className="absolute right-0 bottom-0 z-20 w-7 h-7 text-brandRed border-2 border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <h3 className="text-xs font-semibold ml-1 mt-1">
                  {item.price} HUF
                </h3>
                <p className="text-xs text-gray-500 w-28 line-clamp-2">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="p-5">
          <div className="flex justify-between mb-2">
            <h3 className="text-base">Total</h3>
            <h3 className="text-base">{cart ? cart.totalPrice : 0} HUF</h3>
          </div>
          {/* <div className='flex justify-between mb-2'>
            <h3 className='text-base'>Delivery Fee</h3>
            <h3 className='text-base'>{cart ? 400 : 0} HUF</h3>
          </div>
          <div className='flex justify-between mb-2'>
            <h3 className='text-base font-semibold'>Grand Total</h3>
            <h3 className='text-base font-semibold'>{cart ? cart.totalPrice+400 : 0} HUF</h3>
          </div> */}
        </div>

        {/* Checkout */}
        <div className="p-5">
          <button
            className="w-full h-10 bg-brandRed text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => {
              navigate("checkout");
              setIsCartOpen(false);
            }}
          >
            Checkout
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default YourCart;
