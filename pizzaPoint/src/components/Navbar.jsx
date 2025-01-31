import React from 'react'
import Logo from '../assets/imgs/Logo.webp';
import cart from '../assets/imgs/cart-shopping.png';
function Navbar() {
return (
    <>
        <nav className="w-full h-12 flex">
            <div className='w-full pt-2 flex gap-3'>
                <div className='w-[10rem] h-5/6 ml-5 pt-1 bg-red-600 text-white text-center rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                    <i className="fa-solid fa-location-dot mr-2"></i>
                    Change Location    
                </div>
                <div className='w-36 h-5/6 pt-1 bg-red-600 text-white text-center rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                    <i className="fa-solid fa-phone mr-1"></i>
                    1234567890
                </div>
            </div>

            <div className='w-full flex justify-center relative z-10'>
                <div className='md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full border-0 hover:blur-[1px] transition duration-300 ease-in-out'>
                    <img src={Logo} alt="" className="w-full h-full object-cover border-0 "/>
                </div>
            </div>

            <div className='w-full flex gap-2 justify-end'>
                <div className='w-10 h-10 pt-1 rounded-lg'>
                    <button className='relative w-10 h-10 rounded-lg'>
                        <img src={cart} alt="" className="w-full h-full object-cover hover:blur-[1px] transition duration-300 ease-in-out"/>
                        <span className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span>
                    </button>
                </div>
                
                <button className='w-10 h-10 mr-5 mt-1 pl-3 bg-red-600 rounded-lg flex-col  hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'>
                    <div className='w-3/5 h-[3px] bg-white mb-1 rounded-sm'></div>
                    <div className='w-3/5 h-[3px] bg-white mb-1 rounded-sm'></div>
                    <div className='w-3/5 h-[3px] bg-white rounded-sm'></div>
                </button>
            </div>
        </nav>
    </>
)
}

export default Navbar