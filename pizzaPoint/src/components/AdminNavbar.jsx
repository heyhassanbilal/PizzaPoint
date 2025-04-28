import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../utils/CartContext';

function AdminNavbar() {
    const { cart, loading } = useCart();
    const [isOpen, setIsOpen] = useState(true);
  return (
    <>
        <nav className="fixed top-0 w-full h-16 flex bg-white border-b-2 ">

            <div className='ml-24 mt-4'>
                <h1 className='font-semibold text-2xl text-black'>Dashboard</h1>
            </div>
        
            <div className='w-full flex gap-2 justify-end mt-1'>
                
                <div className={`${isOpen ? "bg-black" : "bg-gray-600"} mt-1 w-32 mr-2 h-11 rounded-2xl text-center hover:cursor-pointer hover:scale-105`} onClick={() => setIsOpen((p)=>!p)}>
                    <p className='text-2xl text-white pt-1'>{isOpen ? "Opened":"Closed"}</p>
                </div>

                <div className='w-10 h-10 mt-1 pt-2 rounded-full text-center'>
                    <Link to="/signup">
                        <button className='hidden sm:block text-black rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                            <i className="fa-regular fa-user fa-2xl"></i>
                        </button>
                    </Link>
                </div>
                
                <button className='w-10 h-10 mr-5 mt-1 pl-3 bg-black rounded-lg flex-col  hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out' onClick={()=> setSideMenuOpen(true)}>
                    <div className='w-3/5 h-[3px] bg-white mb-1 rounded-sm'></div>
                    <div className='w-3/5 h-[3px] bg-white mb-1 rounded-sm'></div>
                    <div className='w-3/5 h-[3px] bg-white rounded-sm'></div>
                </button>
            </div>
        </nav>
    </>
  )
}

export default AdminNavbar