import React from 'react'
import { useState } from 'react';
import ReviewCard from './ReviewCard';
function CardShort({img, title, price}) {
  const [cardOpen, setCardOpen] = useState(false);
  return (
    <>
        {cardOpen && <ReviewCard img={img} title={title} price={price} description="" setCardOpen={setCardOpen} />}
        <div 
        onClick={()=> setCardOpen(true)}
        className="h-[17rem] w-[17rem] bg-cover bg-center bg-no-repeat relative rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        style={{ backgroundImage: `linear-gradient(to bottom,  rgba(0, 0, 0, 0.4) 5%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 50%), url(${img})` }}>
            
            
            <h1 className='text-white p-4 font-bold text-lg '>{title}</h1>
            <h2 className='absolute bottom-3 right-3 pl-2 pr-2 bg-white rounded-xl'>{price} HUF</h2>
            
        </div>
       
    </>
  )
}

export default CardShort