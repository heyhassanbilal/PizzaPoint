import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

function SideMenu({isSideMenuOpen, onSideMenuClose}) {
  return (
    <>
             {/* Overlay */}
            <AnimatePresence>
              {isSideMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black z-40"
                  onClick={onSideMenuClose}
                />
              )}
            </AnimatePresence>
        
            {/* Cart */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: isSideMenuOpen ? 0 : '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 w-screen sm:w-80 h-full bg-brandRed z-50 overflow-y-auto flex flex-col"
            >
                {/* Heading */}
                    <div className='flex justify-end'>
                        {/* <h1 className='text-2xl font-medium p-5'>Your Cart</h1> */}
                        <button className='self-center mt-1 mr-2 text-2xl w-7 h-7 text-white' onClick={onSideMenuClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className='flex flex-col gap-2 justify-center items-center mt-6'>
                        <button className='w-5/6 h-9 bg-white text-brandRed rounded-lg'>
                            Our Location
                        </button>
                    </div>
        
        
            </motion.div>
    </>
  )
}

export default SideMenu