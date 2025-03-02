import React, { useState } from 'react'
import ReviewCard from './ReviewCard'

function CardLong({img,title,price,description,size}) {

    const [cardOpen, setCardOpen] = useState(false);
    return (
        <>
        {cardOpen && <ReviewCard img={img} title={title} price={price} description={description} setCardOpen={setCardOpen} size={size}/>}
        <div className='h-[28rem] w-64 rounded-xl shadow-2xl border-4 border-transparent transition-all duration-300 hover:scale-105 hover:border-brandRed hover:cursor-pointer' onClick={()=> setCardOpen(true)}>
        <div className='h-64 relative'>
            <img src={img} alt="" className='h-full w-full rounded-t-xl' />
            {size && <p className='bg-brandRed text-white absolute top-2 left-0 text-sm px-2 py-1 rounded-md'>
                {size}
            </p>}
        </div>
            <div className='flex-col pt-2'>
                <h1 className='text-center font-bold'>{title}</h1>
                <p className='text-center text-sm mt-5 truncate'>{description}</p>
                <h2 className='text-center text-sm font-bold mt-9'>{price} HUF</h2>
                <div className='text-center mt-2'>
                    <button className='text-center text-white text-sm bg-brandRed pt-1 pb-1 pr-10 pl-10 rounded-xl transition-transform duration-300 hover:scale-105'>Add to Cart</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CardLong