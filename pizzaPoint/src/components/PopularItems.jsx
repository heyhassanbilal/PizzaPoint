import React from 'react'
import CardShort from './CardShort'
import winter01 from '../assets/imgs/winter01.webp'
import winter02 from '../assets/imgs/winter02.webp'
import winter03 from '../assets/imgs/winter03.webp'
import serve6 from '../assets/imgs/serve6.webp'

function PopularItems() {
  return (
    <>
        <div className="flex-col justify-center">
            <h1 className='text-lg font-bold'><i className="fa-solid fa-fire text-orange-400"/> Popular Items</h1>
            <p className='mb-2'>Most ordered right now</p>
        </div>
        <div className='flex justify-between'>
            <CardShort img={serve6} title='Serve 6' price='Rs. 2299'/>
            <CardShort img={winter01} title='Winter Deal 01' price='Rs. 399'/>
            <CardShort img={winter02} title='Winter Deal 02' price='Rs. 699'/>
            <CardShort img={winter03} title='Winter Deal 03' price='Rs. 1099'/>
        </div>
    </>
  )
}

export default PopularItems