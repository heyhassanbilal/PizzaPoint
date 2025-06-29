import React, { useEffect } from "react";
// import SearchBar from './SearchBar'
// import PopularItems from './PopularItems'
// import NewYearDeal from './NewYearDeal'
// import CardLong from './CardLong'
// import serve1 from '../assets/imgs/Serve1.webp'
// import ServeDeals from './ServeDeals'
// import WinterDeals from './WinterDeals'
import BasicCategory from "./BasicCategory";
import BeveragesBanner from "../assets/imgs/BeveragesBanner.jpg";
import ClassicPizzaBanner from "../assets/imgs/ClassicPizzaBanner.jpg";
import FriesBanner from "../assets/imgs/FriesBanner.jpeg";
import burgerBanner from "../assets/imgs/burgerBanner.jpg";
import calzoneBanner from "../assets/imgs/calzoneBanner.jpg";
import PizzaPointLoader from "./PizzaPointLoader";
// import CheeseGarlicBread from '../assets/imgs/CheeseGarlicBread.webp'
// import MeatyGarlicBread from '../assets/imgs/MeatyGarlicBread.webp'
// import CheesyStick from '../assets/imgs/CheesyStick.webp'
// import ChickenWings from '../assets/imgs/ChickenWings.webp'
// import ChickenNuggets from '../assets/imgs/ChickenNuggets.webp'
// import PlainGarlicBread from '../assets/imgs/PlainGarlicBread.webp'
// import { useAuth } from '../utils/AuthContext';
// import { useContext } from "react";
function Container() {
  // const { token, setAuthToken } = useAuth(); // ✅ Token directly mil jayega
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <PizzaPointLoader isLoading={isLoading} />
      <div className="mt-14 pb-80 flex-col w-[77%] h-auto">
        {/* <SearchBar /> */}
        {/* <PopularItems /> */}
        {/* <NewYearDeal /> */}
        {/* <ServeDeals /> */}
        {/* <WinterDeals /> */}
        <BasicCategory
          category={"PIZZA"}
          Banner={ClassicPizzaBanner}
          setIsLoading={setIsLoading}
        />
        <BasicCategory category={"DRINKS"} Banner={BeveragesBanner} />
        <BasicCategory category={"BURGER"} Banner={burgerBanner} />
        <BasicCategory category={"FRIES_NUGGETS"} Banner={FriesBanner} />
        <BasicCategory category={"CALZONE"} Banner={calzoneBanner} />
      </div>
    </>
  );
}

export default Container;
