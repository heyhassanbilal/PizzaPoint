import React from 'react'
import newYearLg from '../assets/imgs/newYearDealLg.webp'
import newYearSm from '../assets/imgs/newYearDealSm.webp'
import CardHorizontal from './CardHorizontal'

function NewYearDeal() {
  return (
    <section id='newYearDeal'>
        <h1 className='text-center text-3xl font-semibold pt-16 pb-8'>New Year Deal</h1>
        <div className='w-full mb-3'>
            <img src={newYearLg} alt="" className='h-full w-full rounded-xl' />
        </div>
        <CardHorizontal img={newYearSm} title="New Year Deal" price={2025} description="2 Regular Pizza 4 Pc Meaty Garlic Bread 1 Ltr Drink" />
    </section>
  )
}

export default NewYearDeal