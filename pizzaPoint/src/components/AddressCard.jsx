import React, { useState, useEffect } from "react";
import { addressService } from "../utils/services";
import { useNavigate } from "react-router-dom";

function AddressCard({ id, address, onAddressSelected }) {
  // Local state to track if this address is selected
  const [isSelected, setIsSelected] = useState(address.selected);

  const navigate = useNavigate();

  // Update local state if the prop changes
  useEffect(() => {
    setIsSelected(address.selected);
  }, [address.selected]);

  const handleOnClick = async (id) => {
    try {
      const message = await addressService.selectAddress(id);
      
      // Update local state immediately for fast UI feedback
      setIsSelected(true);
      
      // Notify parent component to update other address cards
      if (onAddressSelected) {
        onAddressSelected(id);
      }
      
      // alert(message);
      navigate("/checkout");
      
    } catch (err) {
      console.error("Failed to select address", err);
    }
  };

  return (
    <div
      key={id}
      id={id}
      className={`justify-self-center ${
        isSelected ? "border-brandRed" : "border-gray-400"
      } border-2 flex flex-col justify-evenly w-full sm:w-96 h-44 text-center p-2
       rounded-xl hover:scale-105 transform transition hover:cursor-pointer`}
      onClick={() => handleOnClick(id)}
    >
      <h3 className="text-xl font-semibold text-pretty">
        {address.street}
      </h3>

      <div>
        <h3 className="text-pretty">
          {`${address.buildingName}, Apartment Number - ${address.apartmentNo},`}
        </h3>
        <h3 className="text-pretty">
          {`Floor - ${address.floor}`}
        </h3>
        <h3 className="text-pretty">
          {`Intercom - ${address.intercom}`}
        </h3>
      </div>
    </div>
  );
}

export default AddressCard;