import React from "react";
import { addressService } from "../utils/services";

function AddressCard({ key, address }) {
  const handleOnClick = async (id) => {
    try {
      const message = await addressService.selectAddress(id);
      alert(message);
    } catch (err) {
      console.error("Failed to select address", err);
    }
  };
  return (
    <>
      <div
        key={key}
        className={`justify-self-center ${
          address.selected == 1 ? "border-brandRed" : "border-gray-400"
        } border-2 flex flex-col justify-evenly w-full sm:w-96 h-44 text-center p-2
         rounded-xl hover:scale-105 transform transition hover:cursor-pointer`}
        onClick={()=>{handleOnClick(key)}}
      >
        <h3 className="text-xl font-semibold text-pretty">
          {`${address.street}
                        `}
        </h3>

        <div>
          <h3 className="text-pretty">
            {`
                          ${address.buildingName}, 
                          Apartment Number - ${address.apartmentNo}, 
                          
                          `}
          </h3>
          <h3 className="text-pretty">
            {`
                          
                          Floor - ${address.floor}
                          
                          `}
          </h3>
          <h3 className="text-pretty">
            {`
                          
                          Intercom -
                          ${address.intercom}
                          `}
          </h3>
          {/* <h3 className='text-pretty'>
                          
                          {`
                          ${address.city}, 
                          ${address.zip} 
                          `}
                        
                        </h3> */}
        </div>
      </div>
    </>
  );
}

export default AddressCard;
