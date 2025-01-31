import React from 'react'
import SearchBar from './SearchBar'
import PopularItems from './PopularItems'
import NewYearDeal from './NewYearDeal'
import CardLong from './CardLong'
import serve1 from '../assets/imgs/Serve1.webp'
import ServeDeals from './ServeDeals'
import WinterDeals from './WinterDeals'
import BasicCategory from './BasicCategory'
import AppetizersBanner from '../assets/imgs/AppetizersBanner.webp'
import CheeseGarlicBread from '../assets/imgs/CheeseGarlicBread.webp'
import MeatyGarlicBread from '../assets/imgs/MeatyGarlicBread.webp'
import CheesyStick from '../assets/imgs/CheesyStick.webp'
import ChickenWings from '../assets/imgs/ChickenWings.webp'
import ChickenNuggets from '../assets/imgs/ChickenNuggets.webp'
import PlainGarlicBread from '../assets/imgs/PlainGarlicBread.webp'

function Container() {
  return (
    <>
        <div className='flex-col w-[77%] h-auto '>
            <SearchBar />
            <PopularItems />
            <NewYearDeal />
            <ServeDeals />
            <WinterDeals />
            <BasicCategory Banner={AppetizersBanner} items={[[CheeseGarlicBread, "Cheese Garlic Bread", "Rs. 349", ""],
              [MeatyGarlicBread, "Meaty Garlic Bread", "Rs. 499", ""],
              [CheesyStick, "Cheesy Stick", "Rs. 399", ""],
              [ChickenWings, "Chicken Wings", "Rs. 499", ""],
              [ChickenNuggets, "Chicken Nuggets", "Rs. 499", ""],
              [PlainGarlicBread, "Plain Garlic Bread", "Rs. 499", ""],
            
            ]}/>
        </div>
    </>
  )
}

export default Container