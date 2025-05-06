import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddressCard from "./AddressCard";
import { useAuth } from "../utils/useAuth";
import { addressService } from "../utils/services";
import { useNavigate } from 'react-router-dom';

function AddressChange() {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    buildingName: "",
    floor: "",
    apartmentNo: "",
    intercom: "",
    otherInstructions: "",
    street: "",
    city: "",
    zip: "",
    selected: 1,
  });

  useEffect(() => {
    isAuthenticated() ? console.log("User is authenticated") : navigate("/login");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const message = await addressService.addAddress(formData);
      alert(message);
      fetchAddresses(); // Refresh addresses after adding a new one
    } catch (err) {
      console.error("Failed to add address", err);
    }
  };

  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async() => {
    const data = await addressService.fetchAllAddresses();
    setAddresses(data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-brandRed px-4 py-6 sm:py-8">
        <div className="flex flex-col w-full max-w-7xl bg-white shadow-lg rounded-xl mt-16 sm:mt-20 p-4 sm:p-6">
          <div className="flex-col justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center my-2">
              Select Address
            </h2>
            
            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16">
              {addresses && addresses.map((address) => (
                <AddressCard id={address.addressId} address={address} />
              ))}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center mt-6 sm:mt-8">
            Or Add New Address
          </h2>
          
          <form onSubmit={handleSubmit} className="w-full sm:w-4/5 md:w-3/5 self-center space-y-4">
            {/* Street Address */}
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            {/* Building Name */}
            <input
              type="text"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              placeholder="Building Name"
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            {/* Apartment Number */}
            <input
              type="text"
              name="apartmentNo"
              value={formData.apartmentNo}
              onChange={handleChange}
              placeholder="Apartment Number"
              className="w-full p-2 border border-gray-400 rounded"
              required
            />

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Floor */}
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="Floor"
                className="w-full p-2 border border-gray-400 rounded"
                required
              />

              {/* Intercom */}
              <input
                type="text"
                name="intercom"
                value={formData.intercom}
                onChange={handleChange}
                placeholder="Intercom"
                className="w-full p-2 border border-gray-400 rounded"
              />
            </div>

            {/* Other Instructions */}
            <textarea
              name="otherInstructions"
              value={formData.otherInstructions}
              onChange={handleChange}
              placeholder="Other Instructions"
              className="w-full p-2 border border-gray-400 rounded"
              rows="2"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brandRed text-white p-2 rounded hover:scale-105 transform transition"
            >
              Add New Address
            </button>
          </form>
          
          {/* Add padding at the bottom for mobile */}
          <div className="h-4 sm:h-6"></div>
        </div>
      </div>
    </>
  );
}

export default AddressChange;