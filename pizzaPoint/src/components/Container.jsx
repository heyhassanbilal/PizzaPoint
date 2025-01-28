import React from 'react'
import SearchBar from './SearchBar'
import PopularItems from './PopularItems'

function Container() {
  return (
    <>
        <div className='flex-col w-[77%] h-auto'>
            <SearchBar />
            <PopularItems />
        </div>
    </>
  )
}

export default Container