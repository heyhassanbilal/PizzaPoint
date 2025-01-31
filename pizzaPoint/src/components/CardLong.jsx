import React from 'react'

function CardLong({img,title,price,descreption}) {
  return (
    <>
        <div className='h-[28rem] w-64 rounded-xl shadow-2xl border-4 border-transparent transition-all duration-300 hover:scale-105 hover:border-brandRed'>
            <div className='h-64'>
                <img src={img} alt="" className='h-full w-full rounded-t-xl' />
            </div>
            <div className='flex-col pt-2'>
                <h1 className='text-center font-bold'>{title}</h1>
                <p className='text-center text-sm mt-5'>{descreption}</p>
                <h2 className='text-center text-sm font-bold mt-9'>{price}</h2>
                <div className='text-center mt-2'>
                    <button className='text-center text-white text-sm bg-brandRed pt-1 pb-1 pr-10 pl-10 rounded-xl transition-transform duration-300 hover:scale-105'>Add to Cart</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CardLong