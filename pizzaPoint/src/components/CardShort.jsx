import React from 'react'

function CardShort({img, title, price}) {
  return (
    <>
        
        <div 
        className="h-[17rem] w-[17rem] bg-cover bg-center bg-no-repeat relative rounded-xl transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `linear-gradient(to bottom,  rgba(0, 0, 0, 0.4) 5%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 50%), url(${img})` }}>
            
            
            <h1 className='text-white p-4 font-bold text-lg '>{title}</h1>
            <h2 className='absolute bottom-3 right-3 pl-2 pr-2 bg-white rounded-xl'>{price}</h2>
            
        </div>
       
    </>
  )
}

export default CardShort