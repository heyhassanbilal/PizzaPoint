import React from 'react'
import Logo from '../assets/imgs/Logo.webp';

function AdminSidebar() {
  return (
    <>
        <nav className='flex flex-col fixed z-20 top-0 left-0 w-16 h-screen bg-black'>
            <div className='ml-2 mt-2 w-12 rounded-lg bg-white border-0 hover:blur-[1px] transition duration-300 ease-in-out'>
                <img src={Logo} alt="" className="w-full h-full object-cover border-0"/>
            </div>
        </nav>
    </>
  )
}

export default AdminSidebar