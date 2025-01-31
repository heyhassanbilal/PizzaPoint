import React from 'react'
import ServeBanner from '../assets/imgs/ServeDealsBanner.webp'
import CardLong from './CardLong'
import serve1 from '../assets/imgs/Serve1.webp'
import serve2 from '../assets/imgs/Serve2.webp'
import serve3 from '../assets/imgs/Serve3.webp'
import serve4 from '../assets/imgs/Serve4.webp'
import serve5 from '../assets/imgs/Serve5.webp'
import serve6 from '../assets/imgs/Serve6.webp'

function ServeDeals() {
  return (
    <>
        <div className='w-full mt-8'>
            <img className="rounded-xl" src={ServeBanner} alt="" />
        </div>
        <div className='mt-7 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <CardLong img={serve1} title="Serve 1" price="Rs. 449" descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price="Rs. 449" descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price="Rs. 449" descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price="Rs. 449" descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price="Rs. 449" descreption="1 Small Pizza" />
            <CardLong img={serve1} title="Serve 1" price="Rs. 449" descreption="1 Small Pizza" />
        </div>
    </>
  )
}

export default ServeDeals