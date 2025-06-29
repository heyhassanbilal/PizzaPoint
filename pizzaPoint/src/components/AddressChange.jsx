import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddressCard from "./AddressCard";
import { useAuth } from "../utils/useAuth";
import { addressService } from "../utils/services";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

function AddressChange() {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [placeLatLng, setPlaceLatLng] = useState(null);

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
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
      const result = await addressService.validateAddress({
        street: formData.street,
        latitude: placeLatLng.lat,
        longitude: placeLatLng.lng,
      });
      if (result.valid) {
        // Now actually save the address
        await addressService.addAddress({
          ...formData,
        });
        fetchAddresses();  
        // Reset form fields
        setFormData({
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
        navigate("/");
      } else {
        alert("This address is outside our 5 km delivery zone.");
      }
    } catch (err) {
      console.error("Failed to add address", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const data = await addressService.fetchAllAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    }
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;

      if (location) {
        setFormData((prev) => ({
          ...prev,
          street: place.formatted_address,
        }));
        setPlaceLatLng({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    }
  };

  // This function will be called when an address is selected in AddressCard
  const handleAddressSelected = (selectedId) => {
    // Update all addresses to reflect the new selection
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) => ({
        ...address,
        selected: address.addressId === selectedId ? 1 : 0,
      }))
    );
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-brandRed px-4 py-6 sm:py-8">
        <div className="flex flex-col w-full max-w-7xl bg-white shadow-lg rounded-xl mt-16 sm:mt-20 p-4 sm:p-6">
          {addresses[0] && (
            <div className="flex-col justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center my-2">
                Select Address
              </h2>

              {/* Responsive grid layout */}
              <div
                className={`grid gap-4 sm:gap-6 mb-8 sm:mb-16 justify-center 
    ${
      addresses?.length === 1
        ? "grid-cols-1"
        : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    }`}
              >
                {addresses &&
                  addresses.map((address) => (
                    <AddressCard
                      key={address.addressId}
                      id={address.addressId}
                      address={address}
                      onAddressSelected={handleAddressSelected}
                    />
                  ))}
              </div>
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center mt-6 sm:mt-8">
            Add New Address
          </h2>

          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-4/5 md:w-3/5 self-center space-y-4"
          >
            {/* Street Address */}
            {/* <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full p-2 border border-gray-400 rounded"
              required
            /> */}

            {isLoaded && (
              <Autocomplete
                onLoad={setAutocomplete}
                onPlaceChanged={handlePlaceSelect}
              >
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  className="w-full p-2 border border-gray-400 rounded"
                />
              </Autocomplete>
            )}

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
