import React from 'react'
// 
function CardHorizontal({img, title, price, description}) {
  return (
    <>
        <div className=' flex lg:w-1/2 lg:h-44 rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105'>
            <div className='pt-4 pl-3 w-[60%] h-full'>
                <h1 className='font-semibold text-lg'>{title}</h1>
                <p className='text-sm'>{description}</p>
                <h2 className='mt-6'>{price}</h2>
            </div>
            <div className='flex justify-center w-[40%] h-full'>
                <img src={img} alt={title} className='m-2 w-[90%] h-[90%] object-cover border-0 rounded-xl' />
            </div>
        </div>
    </>
  )
}

export default CardHorizontal