import React from 'react'

function ViewCartOverlay({setIsCartOpen}) {
return (
    <>
        <div className='fixed bottom-0 p-5 left-1/2 transform -translate-x-1/2 flex justify-around items-center bg-brandRed w-[25rem] h-16 rounded-t-lg hover:cursor-pointer' onClick={()=> setIsCartOpen(true)}>
                <div className='w-8 h-8 rounded-full border-white border-2'>
                    <h3 className='text-white  h-full w-full text-center text-lg font-bold'>1</h3>
                </div>
                <div className='flex-1'>
                    <h1 className='text-white font-bold text-center'>View Cart</h1>
                </div>
                <div className='w-28 '>
                    <h3 className='text-white text-right font-bold'>Rs. 0.00</h3>
                </div>
        </div>
    </>
)
}

export default ViewCartOverlay