import {useState, useEffect} from 'react'
import Navbar from './Navbar'
import AddressCard from './AddressCard';
import { useAuth } from "../utils/useAuth";
import app from '../firebase';

function AddressChange() {


    const {email, token}= useAuth();

    

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

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8082/api/address/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            const message = await res.text();
            alert(message);
            fetchAddresses(); // Refresh addresses after adding a new one
        } catch (err) {
            console.error("Failed to add address", err);
        }
    };


    const [addresses, setAddresses] = useState([]);


    const fetchAddresses = () => {
      fetch("http://localhost:8082/api/address/all",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if you're using auth
        },
      })
        .then(res => res.json())
        .then(data => setAddresses(data));
  };
  
  useEffect(() => {
      fetchAddresses();
    }, []);
    console.log(addresses)
    
      // const handleChange = (e) => {
      //   setFormData({ ...formData, [e.target.name]: e.target.value });
      // };
    
      
    
      return (
        <>
          <Navbar />
          <div className="flex justify-center items-center h-auto bg-brandRed">
            <div className="flex flex-col  max-w-7xl w-full p-6 bg-white shadow-lg rounded-xl mt-24 ">

              <div className='flex-col justify-between gap-7'>
                <h2 className="text-3xl font-bold mb-14 text-center my-2">Select Address</h2>
                <div className='grid grid-cols-3 gap-4 mb-16'>
                  {addresses && addresses.map((address, index) => (
                    <AddressCard address={address} index={index} ></AddressCard>
                  ))}
                </div>
                

              </div>

              <h2 className=" text-2xl font-semibold mb-4 text-center mt-8"> Or Create Add New Address</h2>
              <form onSubmit={handleSubmit} className="w-3/5 self-center space-y-4">

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

                  <div className='flex justify-between gap-4'>

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

                  {/* <div className='flex justify-between gap-4'> */}

                      {/* City */}
                      {/* <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                      /> */}
            
                      {/* ZIP Code */}
                      {/* <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="ZIP Code"
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                      /> */}
                  {/* </div> */}
      

                {/* Other Instructions */}
                <textarea
                  name="otherInstructions"
                  value={formData.otherInstructions}
                  onChange={handleChange}
                  placeholder="Other Instructions"
                  className="w-full p-2 border border-gray-400 rounded"
                  rows="2"
                ></textarea>
      
                {/* Order Type Dropdown */}
                {/* <select
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select> */}
      
                {/* Payment Method Dropdown */}
                {/* <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="cash">Cash</option>
                  <option value="paypal">PayPal</option>
                </select> */}
      
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-brandRed text-white p-2 rounded hover:scale-105 transform transition"
                >
                  Add New Address
                </button>
              </form>
            </div>
          </div>
          </>
      );
}

export default AddressChange