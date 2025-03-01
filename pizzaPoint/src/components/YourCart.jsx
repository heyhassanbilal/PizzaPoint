import React, { useRef } from 'react'
import serve6 from '../assets/imgs/serve6.webp'
import { motion, AnimatePresence } from 'framer-motion';
function YourCart({ cartItems, popularItems, setCartItems, isOpen, onClose }) {
    
    const containerRef = useRef(null);

    const removeItems = (item) => {
        const updatedItems = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            // if (cartItem.qty === 1) {
            //   return null;
            // }
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
      className="fixed top-0 right-0 w-[23rem] h-full bg-white rounded-l-xl z-50 overflow-y-auto flex flex-col"
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
                {cartItems.map((item) => item.qty == 0?  null :(
                    <div className='flex p-5 justify-around border-b-2'>
                        <div className='w-16 h-16'>
                            <img src={serve6} alt="" className="h-full w-full object-cover rounded-md"/>
                        </div>
                        <div className='w-32 self-center'>
                            <h1 className='text-sm'>{item.name}</h1>
                            <h1 className='text-sm'>{item.price}</h1>
                        </div>
                        <div className='flex w-24 h-8 self-center justify-evenly text-brandRed border-brandRed border-2 rounded-3xl'>
                            <button onClick={() => removeItems(item)}>
                                {item.qty == 1 ? <i className="fa-solid fa-trash"></i> : <i className="fa-solid fa-minus"></i> }
                            </button>
                            <h4 className=''>{item.qty}</h4>
                            <button onClick={() => addItems(item)}>
                                <i className="fa-solid fa-plus"></i>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
            
            {/* Add more Items */}
            <div className='p-5 hover:cursor-pointer' onClick={onClose}>
                <h3 className='text-gray-500'>+ Add more items</h3>
            </div>
            
            {/* Popular Items */}
            <div className='p-5 border-b-2 '>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='text-sm font-medium'>Popular Items</h3>
                        <h3 className='text-xs text-gray-500'>Customers often buy these together</h3>
                    </div>
                    <div>

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
                    {popularItems.map((item) => (
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
            </div>

            {/* Amount */}
            <div className='p-5'>
                <div className='flex justify-between mb-2'>
                    <h3 className='text-base'>Total</h3>
                    <h3 className='text-base'>1,000 HUF</h3>
                </div>
                <div className='flex justify-between mb-2'>
                    <h3 className='text-base'>Delivery Fee</h3>
                    <h3 className='text-base'>1,000 HUF</h3>
                </div>
                <div className='flex justify-between mb-2'>
                    <h3 className='text-base'>Grand Total</h3>
                    <h3 className='text-base'>2,000 HUF</h3>
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