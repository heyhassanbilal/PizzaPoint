import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
      const response = await fetch(`http://localhost:8082/api/cart/user-email?email=${encodeURIComponent(email)}`, {
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
    const response = await fetch("http://localhost:8082/api/cart/add-to-cart", {
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
        const response = await fetch(`http://localhost:8082/api/cart/update/${id}?quantity=${encodeURIComponent(qty)}`, {
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

[
    {
      "id": 1,
      "cartItems": [
        {
          "id": 1,
          "cart": 1,
          "menuItem": {
            "id": "PIZ_013",
            "name": "Spicy Hot",
            "description": "Tomato sauce, minced beef, tomato, jalapeno, cheese, onions",
            "price": 4199.00,
            "category": "PIZZA",
            "size": "MEDIUM",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067?w=1024",
            "cartEntries": [
              1
            ],
            "orderItems": [],
            "available": true
          },
          "extras": [
            {
              "id": "EXT_001",
              "name": "Cheese Burst",
              "price": 1.50
            },
            {
              "id": "EXT_003",
              "name": "Spicy Jalapenos",
              "price": 1.00
            }
          ],
          "quantity": 5,
          "totalPrice": 21007.50
        },
        {
          "id": 3,
          "cart": 1,
          "menuItem": {
            "id": "PIZ_001",
            "name": "Margarita",
            "description": "Tomato sauce, cheese",
            "price": 2899.00,
            "category": "PIZZA",
            "size": "MEDIUM",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067?w=1024",
            "cartEntries": [
              3
            ],
            "orderItems": [],
            "available": true
          },
          "extras": [
            {
              "id": "EXT_002",
              "name": "Extra Olives",
              "price": 0.75
            },
            {
              "id": "EXT_004",
              "name": "Garlic Dip",
              "price": 0.50
            }
          ],
          "quantity": 3,
          "totalPrice": 8700.75
        }
      ],
      "user": {
        "id": 1,
        "name": "tindy",
        "address": "Petofi ter 6",
        "phone": "06704073559",
        "email": "hassanbilal1837@gmail.com"
      },
      "createdAt": "2025-03-06T19:08:34.166753",
      "totalPrice": 29708.25
    }
  ]

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
