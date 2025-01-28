import React from 'react'
import "../App.css"

function CategoriesList() {
  return (
    <>
        <ul className='scroll_height h-14 pr-2 pl-2 flex flex-nowrap items-center space-x-16 overflow-x-auto bg-red-600 text-white scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-500'>
            <li className='text-nowrap'><a href="">New Year Deal</a></li>
            <li className='text-nowrap'><a href="">Serve Deals</a></li>
            <li className='text-nowrap'><a href="">Winter Deals</a></li>
            <li className='text-nowrap'><a href="">Appetizers</a></li>
            <li className='text-nowrap'><a href="">Classic Pizza</a></li>
            <li className='text-nowrap'><a href="">Premium Pizza</a></li>
            <li className='text-nowrap'><a href="">Special Pizza</a></li>
            <li className='text-nowrap'><a href="">Sandwiches</a></li>
            <li className='text-nowrap'><a href="">Pastas</a></li>
            <li className='text-nowrap'><a href="">Fries</a></li>
            <li className='text-nowrap'><a href="">Dip & Souces</a></li>
            <li className='text-nowrap'><a href="">Beverages</a></li>
            
        </ul>
    </>
  )
}

export default CategoriesList