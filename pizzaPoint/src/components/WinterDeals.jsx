import React from 'react'
import CardLong from './CardLong'
import winterBanner from '../assets/imgs/winterBanner.webp'
import winter01 from '../assets/imgs/winter01.webp'
import winter02 from '../assets/imgs/winter02.webp'
import winter03 from '../assets/imgs/winter03.webp'

function WinterDeals() {
  return (
    <div id='winterDeals'>
        <div className='w-full mt-8'>
            <img className="rounded-xl" src={winterBanner} alt="" />
        </div>
        <div className='mt-7 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <CardLong img={winter01} title="Winter Deal 01" price={399}descreption="1 Small Pizza" />
            <CardLong img={winter02} title="Winter Deal 02" price={699}descreption="1 Regular Pizza" />
            <CardLong img={winter03} title="Winter Deal 03" price={1090} descreption="1 Large Pizza" />
        </div>
    </div>
  )
}

export default WinterDeals