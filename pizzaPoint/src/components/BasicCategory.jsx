import React from 'react';
import CardLong from './CardLong';
import { useState } from 'react';
import ReviewCard from './ReviewCard';

function BasicCategory({ Banner, items, category }) {  
  return (
    <>
      
      <div id={category} className='w-full mt-8'>
        <img className="rounded-xl" src={Banner} alt="" />
      </div>
      <div className='mt-7 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.isArray(items) && items.map((item, index) => (  
          <CardLong 
            key={index} 
            img={item[0]} 
            title={item[1]} 
            price={item[2]} 
            description={item[3]} 
          />
        ))}
      </div>


    </>
  );
}

export default BasicCategory;
