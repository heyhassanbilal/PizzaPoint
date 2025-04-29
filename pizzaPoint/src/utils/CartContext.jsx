import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const baseUrl = 'https://pizzapoint-c71ca9db8a73.herokuapp.com';

  const [cart, setCart] = useState([]);
//   const [extra, setExtra] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const {email, token}= useAuth(); 
  // Fetch cart from the database when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/cart/user-email?email=${encodeURIComponent(email)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response,"-------=====================")
      const data = await response.json();
      console.log(data,"=====================")
      setCart(data[0]); // Update state with fetched cart
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
      console.log(cart);
    }
  };

  const addToCart = async (id, qty, extras) => {
    
    try {
    const response = await fetch(`${baseUrl}/api/cart/add-to-cart`, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams({ menuItemId: id, quantity: qty, extraItemId: extras }),
    });
    console.log(extras,"========================")

    const data = await response.text();
    console.log("✅ Success:", data); 
    fetchCart(); // Refresh cart after adding an item
    } catch (error) {
    console.error("❌ Error adding item to cart:", error.message);
    }
};

const updateCart = async (id,qty) => {
    const item = cart.cartItems.find((item) => item.id === id); // Find the item in the cart
    // if (!item) return;
    try {
        const response = await fetch(`${baseUrl}/api/cart/update/${id}?quantity=${encodeURIComponent(qty)}`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await response.text();
        console.log("✅ Success:", data);
        fetchCart(); // Refresh cart after adding an item
    } catch (error) {
        console.log(error)
    }
};


//   const addToCart = async (item,qty) => {
//     try {
//       await fetch("http://localhost:8082/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(item),
//       });
//       fetchCart(); // Refresh cart after adding an item
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     try {
//       await fetch(`http://localhost:8082/api/cart/remove/${itemId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCart(); // Refresh cart after removing an item
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       await fetch("http://localhost:8082/api/cart/clear", {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart([]); // Clear state immediately
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use the Cart
export const useCart = () => useContext(CartContext);
