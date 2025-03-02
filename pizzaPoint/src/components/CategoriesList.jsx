import React from 'react'
import "../App.css"
import { Link } from 'react-scroll';
function CategoriesList() {
  return (
    <>
        <ul className='sticky top-0 z-20 scroll_height h-14 pr-2 pl-2 flex flex-nowrap items-center space-x-16 overflow-x-auto bg-red-600 text-white scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-500'>
            <li className='flex-none text-nowrap'><a href="#newYearDeal" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">New Year Deal</a></li>
            <li className='flex-none text-nowrap'><a href="#serveDeals" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Serve Deals</a></li>
            <li className='flex-none text-nowrap'><a href="#winterDeals" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Winter Deals</a></li>
            <li className='flex-none text-nowrap'><a href="#appetizers" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Appetizers</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Classic Pizza</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Premium Pizza</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Special Pizza</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Sandwiches</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Pastas</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Fries</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Dip & Souces</a></li>
            <li className='flex-none text-nowrap'><a href="" className="px-1 cursor-pointer hover:bg-white hover:text-brandRed rounded-lg hover:py-1 ">Beverages</a></li>
            
        </ul>
    </>
  )
}

export default CategoriesList