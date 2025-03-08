import React, { useEffect, useRef, useState } from 'react'
import serve6 from '../assets/imgs/serve6.webp'
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../utils/CartContext';
import { useAuth } from '../utils/useAuth';

function YourCart({ cartItems, popularItems, setCartItems, isOpen, onClose }) {

    
    const { email, token } = useAuth();
    const {cart, updateCart, addToCart}  = useCart();
    console.log(cart,"dhabdjhabhjd");

    // const [cartItem, setCartItems] = useState([])

    [
        {
            "id": 1,
            "cartItems": [
                {
                    "id": 1,
                    "cart": 1,
                    "menuItem": {
                        "id": "PIZ_021",
                        "name": "4 Évszak",
                        "description": "Tomato sauce, cheese, beef, bacon, mushrooms, black olives, artichokes",
                        "price": 3999.00,
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
                    "totalPrice": 12000.75
                },
                {
                    "id": 2,
                    "cart": 1,
                    "menuItem": {
                        "id": "PIZ_014",
                        "name": "Spicy Hot",
                        "description": "Tomato sauce, minced beef, tomato, jalapeno, cheese, onions",
                        "price": 5499.00,
                        "category": "PIZZA",
                        "size": "LARGE",
                        "imageUrl": "https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067?w=1024",
                        "cartEntries": [
                            2
                        ],
                        "orderItems": [],
                        "available": true
                    },
                    "extras": [
                        {
                            "id": "EXT_003",
                            "name": "Spicy Jalapenos",
                            "price": 1.00
                        },
                        {
                            "id": "EXT_005",
                            "name": "BBQ Sauce",
                            "price": 1.25
                        }
                    ],
                    "quantity": 3,
                    "totalPrice": 16503.75
                }
            ],
            "user": {
                "id": 52,
                "name": "tindy",
                "address": "Petofi ter 6",
                "phone": "06704073559",
                "email": "hassanbilal17@gmail.com"
            },
            "createdAt": "2025-03-06T22:28:24.991142",
            "totalPrice": 28504.50
        }
    ]
    
    const containerRef = useRef(null);

    const [drinks, setDrinks] = useState([]);
      useEffect(() => {
        const controller = new AbortController(); // Create controller for aborting requests
        const { signal } = controller; // Extract signal from the controller
    
        async function fetchDrinks() {
          try {
            const response = await fetch('http://localhost:8082/api/menuItem/get/category/DRINKS', {
              headers: { Authorization: `Bearer ${token}` },
              signal, // Attach the signal to the fetch request for cancellation
            });
    
            if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.statusText}`);
            }
    
            const json = await response.json();
            setDrinks((prevData) => [...json]); // Prevent overwriting data
          } catch (error) {
            if (error.name !== 'AbortError') {
              console.log("Error fetching data:", error.message);
              console.log(token)
            }
          }
        }
    
        fetchDrinks();
    
        return () => controller.abort(); // Abort the request when component unmounts or token changes
        
      }, [token]); // Trigger fetch when the token changes
      
      useEffect(()=>{console.log(drinks)},[drinks])


    const removeItems = (item) => {
        const updatedItems = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, qty: cartItem.qty - 1 };
          }
          return cartItem;
        });
        
        setCartItems(updatedItems);
    };

    const addItems = (item) => {
        const updatedItems = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, qty: cartItem.qty + 1 };
          }
          return cartItem;
        });
        
        setCartItems(updatedItems);
      };


    const scrollLeft = () => {
        if (containerRef.current) {
        containerRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
        containerRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
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
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 right-0 w-screen sm:w-[23rem] h-full bg-white rounded-l-xl z-50 overflow-y-auto flex flex-col"
    >
        {/* Heading */}
            <div className='flex justify-between'>
                <h1 className='text-2xl font-medium p-5'>Your Cart</h1>
                <button className='self-center mr-4 text-2xl w-7 h-7 bg-brandRed text-white rounded-full' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            {/* Cart Items */}
            <div className='w-full'>
                {cart && cart.cartItems.map((item) => item.quantity == 0?  null :(
                    <div className='border-b-2'>
                        <div className='flex p-5 justify-around '>
                            <div className='w-16 h-16 mr-2'>
                                <img src={item.menuItem.imageUrl} alt="" className="h-full w-full object-cover rounded-md shadow-lg"/>
                            </div>
                            <div className='w-32 shrink self-center'>
                                <h1 className='text-md'>{item.menuItem.name}</h1>
                                
                            </div>
                            <div className='flex w-24 h-8 ml-2 self-center justify-evenly text-brandRed border-brandRed border-2 rounded-3xl'>
                                <button onClick={() => updateCart(item.id,item.quantity-1)}>
                                    {item.quantity == 1 ? <i className="fa-solid fa-trash"></i> : <i className="fa-solid fa-minus"></i> }
                                </button>
                                <h4 className=''>{item.quantity}</h4>
                                <button onClick={() => updateCart(item.id,item.quantity+1)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>

                            </div>
                        </div>
                        <div className='flex-col'>
                            <div className='flex'>
                                
                                <h3 className='text-xs ml-6 text-gray-600'>
                                    {item.extras
                                    .map((extra) => `${extra.name}(${extra.price} HUF)`)
                                    .join(", ") // Join with ", "
                                    }</h3>
                                {/* <h3 className='text-xs text-gray-600'>120HUF</h3> */}
                            </div>

                            <h1 className='text-end text-sm font-semibold mb-3 mr-2'>{item.totalPrice} HUF</h1>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Add more Items */}
            <div className='p-5 hover:cursor-pointer' onClick={onClose}>
                <h3 className='text-gray-500'>+ Add more items</h3>
            </div>
            
            {/* Popular Items */}
            {/* <div className='p-5 border-b-2 '>
                <div className='flex justify-between'>
                    <div className='shrink'>
                        <h3 className='text-sm font-medium'>Drinks</h3>
                        <h3 className='text-xs text-gray-500'>Customers often buy these together</h3>
                    </div>
                    <div className='shrink-0'>

                        <button
                            onClick={scrollLeft}
                            className="mr-2 w-7 h-7 border-2 border-gray-950 rounded-lg"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={scrollRight}
                            className=" w-7 h-7 border-2 border-gray-950 rounded-lg"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
                <div ref={containerRef} className='flex overflow-x-hidden scroll-smooth' >
                    {drinks.map((item) => (
                        <div className='flex flex-col p-3 '>
                            <div className='relative w-[120px] h-[120px] border-2 border-gray-300 rounded-lg'>
                                <img src={serve6} alt="" className="h-full w-full object-cover rounded-lg"/>
                                <button className='absolute right-0 bottom-0 z-20 w-7 h-7 text-brandRed border-2 border-gray-300 rounded-full bg-white'>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <h3 className='text-xs font-semibold ml-1'>{item.price} HUF</h3>
                            <p className='text-xs text-nowrap ml-1 text-gray-500'>{item.name}</p>
                        </div>
                    ))}
                </div>
                
            </div> */}

            <div className='p-5 border-b-2 '>
                <div className='flex justify-between'>
                    <div className='shrink'>
                        <h3 className='text-sm font-medium'>Popular Items</h3>
                        <h3 className='text-xs text-gray-500'>Customers often buy these together</h3>
                    </div>
                    <div className='shrink-0'>

                        <button
                            onClick={scrollLeft}
                            className="mr-2 w-7 h-7 border-2 border-gray-950 rounded-lg"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={scrollRight}
                            className=" w-7 h-7 border-2 border-gray-950 rounded-lg"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
                <div ref={containerRef} className='flex overflow-x-auto scroll-smooth scrollbar-none' >
                    {drinks.map((item) => (
                        <div className='flex flex-col p-3 '>
                            <div className='relative w-[120px] h-[120px] border-2 border-gray-300 rounded-lg'>
                                <img src={serve6} alt="" className="h-full w-full object-cover rounded-lg"/>
                                <button onClick={()=>addToCart(item.id,1,null)} className='absolute right-0 bottom-0 z-20 w-7 h-7 text-brandRed border-2 border-gray-300 rounded-full bg-white'>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <h3 className='text-xs font-semibold ml-1'>{item.price} HUF</h3>
                            <p className='text-xs text-wrap ml-1 text-gray-500 w-28 '>{item.name}</p>
                        </div>
                    ))}
                </div>
                
            </div>

            {/* Amount */}
            <div className='p-5'>
                <div className='flex justify-between mb-2'>
                    <h3 className='text-base'>Total</h3>
                    <h3 className='text-base'>{cart? cart.totalPrice: 0} HUF</h3>
                </div>
                <div className='flex justify-between mb-2'>
                    <h3 className='text-base'>Delivery Fee</h3>
                    <h3 className='text-base'>{cart? 1000 : 0} HUF</h3>
                </div>
                <div className='flex justify-between mb-2'>
                    <h3 className='text-base'>Grand Total</h3>
                    <h3 className='text-base'>{cart? cart.totalPrice+1000 : 0} HUF</h3>
                </div>
            </div>
            
            {/* Checkout */}
            <div className='p-5'>
                <button className='w-full h-10 bg-brandRed text-white rounded-lg'>Checkout</button> 
            </div>


        </motion.div>
    </>
  )
}

export default YourCart