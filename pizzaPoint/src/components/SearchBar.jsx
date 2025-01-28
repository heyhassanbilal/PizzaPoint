import React from 'react'

function SearchBar() {
  return (
    <>
        <div className='flex w-full justify-between items-center mt-10 border-red-500 border-[1px] rounded-full p-2'>
            <input type="text" placeholder=" Search for item by title..." className='border-none placeholder-red-500' />
            <button className='w-7 h-7 bg-red-600 text-white rounded-full'><i className="fa-solid fa-arrow-right"></i></button>
        </div>
    </>
  )
}

export default SearchBar