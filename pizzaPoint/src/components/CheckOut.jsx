import {useState,useEffect} from 'react'
import Navbar from './Navbar'
import AddressCard from './AddressCard';
import { useCart } from '../utils/CartContext';
import { useAuth } from "../utils/useAuth";
// Import useNavigate hook
import { useNavigate } from 'react-router-dom';
import { use } from 'react';


function CheckOut() {
    const navigate = useNavigate();
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [check, setCheck] = useState();
    
    let orderType = "DELIVERY";
    let paymentMethod = "CASH";
    const {email, token}= useAuth(); 

    async function getSelectedAddress() {
        try {
            const response = await fetch('http://localhost:8082/api/address/selected?isSelected=true', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Assuming the backend expects JSON
                    Authorization: `Bearer ${token}`, // Include token if authentication is required
                },
            });

            // Check if the response is successful (status code 2xx)
            if (!response.ok) {
                throw new Error('Error fetching selected address');
            }

            // Parse the JSON response
            const data = await response.json();

            // Update the state with the fetched data
            setSelectedAddresses(data); // Update state with selected addresses
            console.log(data, "selectedAddresses-----------------"); // Log the data

        } catch (error) {
            console.error('Error fetching selected address:', error);
            alert('Error fetching selected address: ' + error.message);
        }
    }

    // Use useEffect to call the function on component mount
    useEffect(() => {
        getSelectedAddress(); // Call the function to fetch selected addresses
    }, []); // Empty dependency array means this runs only once when the component mounts

    async function checkout() {
        try {
            const response = await fetch('http://localhost:8082/api/orders/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });
    
            // Check if the response is ok before parsing JSON
            if (!response.ok) {
                // Directly handle error if the response is not OK
                const errorText = await response.text();  // Get the error message from the response
                throw new Error('Error during checkout: ' + errorText);
            }
    
            // Parse the JSON response after checking response.ok
            const data = await response.json();
            
            // Proceed to next step after successful checkout
            setCheck(data);  // Make sure the order data is available
            console.log(data, "checkout data-----------------"); // Log the checkout data
    
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Error during checkout: ' + error.message);  // Display error message
        }
    }
    
    useEffect(() => {
        checkout();
        
    },[])

    const handlePlaceOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8082/api/orders/placeorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: new URLSearchParams({ paymentMethod: paymentMethod, orderType: orderType }),
                credentials: 'include',  // Ensure cookies are sent
            });
    
            // Check if the response is OK
            if (!response.ok) {
                const errorData = await response.text();  // Read error response
                console.error('Error placing order:', errorData);
                alert('There was an issue with your order: ' + errorData);
            } else {
                // Read and process the JSON data in the response
                const data = await response.json();  // Use .json() to read the response as JSON
                console.log("✅ Success:", data); // Log the success response
                // Handle the success response accordingly
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

      const {cart}  = useCart();
    //   console.log(cart, "cart-----------------");
      // Ensure cart exists and has cartItems before mapping
    const cartItems = cart && cart.cartItems ? cart.cartItems : [];

  return (
    <>
        <Navbar />
        <div className='w-screen h-auto flex bg-brandRed'>
            <div className='w-1/2 h-auto flex flex-col items-end mt-32'>

                <div className='flex w-[36rem] h-12 rounded-full bg-white items-center p-1'>
                    <div className='bg-brandRed text-white w-1/2 h-full rounded-full text-center pt-2'>
                        <h3>Delivery</h3>
                    </div>
                    <div className='text-brandRed w-1/2 rounded-full h-full pt-2 text-center '>
                        <h3>Pickup</h3>
                    </div>
                </div>

                <div className='flex flex-col w-[36rem] text-white mt-10'>
                    <h2 className='text-2xl'>Where?</h2>

                    <div className='w-full flex flex-col mt-4 px-4 rounded-xl border-2 border-gray-400'>
                        <div className='flex justify-between py-5 border-b-[1px] border-gray-400 hover:cursor-pointer' onClick={() => {navigate("/address")}}>
                            <div className='flex'>
                                <i className="fa-solid fa-house pt-[0.15rem]"></i>
                                <h5 className='ml-7 mr-5'>{selectedAddresses.buildingName}</h5>
                                <p className='text-sm text-gray-300 pt-[0.15rem]'>Petofi ter 6</p>
                            </div>
                            <p><i class="fa-solid fa-chevron-right"></i></p>
                        </div>
                        <div className='flex justify-between py-5 '>
                            <div className='flex'>
                                <i className="fa-solid fa-house pt-[0.15rem]"></i>
                                <h5 className='ml-7 mr-5'>Leave at the door</h5>
                                
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer"/>
                                <div class="w-11 h-6 border-[1px] border-gray-400 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-brandRed peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>

                        </div>
                    </div>

                    <h2 className='text-2xl mt-8'>When?</h2>

                    <div className='w-full h-16 mt-4 rounded-2xl border-2 border-white pl-5'>
                        <h6 className='font-bold text-lg mt-1'>Standard</h6>
                        <p className='text-sm text-gray-300'>40-50 min</p>
                    </div>

                    <h2 className='text-2xl mt-8'>Order Items</h2>
                    <div>
                        <div className='flex flex-col mt-4 gap-4 border-2 border-white rounded-lg p-4'>
                            {cartItems && cartItems.map((item) => item.quantity > 0 && (
                                <div key={item.id} className='flex justify-between w-full h-16 px-2'>
                                    <div className='flex'>
                                        <img src={item.menuItem.imageUrl} alt="food" className='w-16 h-16 rounded-lg'/>
                                        <div className='flex flex-col ml-4'>
                                            <h3 className='text-white font-bold'>{item.menuItem.name}</h3>
                                            {item.extras[0] && <h5 className='text-sm text-gray-300'>
                                                Extras: {item.extras.map((extra) => extra.name).join(", ")}
                                            </h5>}
                                            <h5 className='text-sm text-gray-300'>HUF {item.totalPrice}</h5>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <h3>x{item.quantity}</h3>
                                    </div>
                                    
                                </div>
                                
                            ))}
                        </div>
                    </div>
                    <a href="" className='mt-2'>+ Add more items</a>

                    <h2 className='text-2xl mt-8 mb-4'>Payment</h2>

                    <div className='flex justify-between w-full h-20 p-4 mb-4 border-2 rounded-2xl border-gray-400'>
                        <div className='flex gap-5'>
                            <i class="fa-solid fa-sack-dollar text-xl mt-1"></i>
                            <div className='flex flex-col '>
                                <h3 className='text-white font-bold'>Cash</h3>
                                <p className='text-sm text-gray-300'>The chosen payment method will be charged</p>
                            </div>

                        </div>
                        <i class="fa-solid fa-chevron-right mt-3"></i>
                    </div>

                    

                </div>

            </div>



            <div className='w-1/2 h-screen flex justify-center bg-brandRed'>
                <div className='fixed w-[25rem] h-[31rem] mt-32 bg-white rounded-lg flex flex-col p-8 justify-around'>
                    <h2 className='text-2xl font-bold text-brandRed pb-4 border-b-2'>Summary</h2>

                    <div className='flex flex-col mt-4 gap-4'>
                        <div className='flex justify-between text-brandRed'>
                            <h4>Item Subtotal</h4>
                            <h4>HUF 3,190</h4>
                        </div>
                        <div className='flex justify-between text-brandRed'>
                            <h4>Bottle Deposit</h4>
                            <h4>HUF 50</h4>
                        </div>
                        <div className='flex justify-between text-brandRed'>
                            <h4>Service fee</h4>
                            <h4>HUF 149</h4>
                        </div>
                        <div className='flex justify-between text-brandRed'>
                            <h4>Delivery</h4>
                            <h4>HUF 440</h4>
                        </div>
                        <div className='flex justify-between text-brandRed'>
                            <h4>Item Subtotal</h4>
                            <h4>HUF 3,190</h4>
                        </div>
                    </div>

                    <button className='w-full h-12 bg-brandRed text-white font-bold rounded-lg mt-4' onClick={() => handlePlaceOrder()}>
                        Click to order
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CheckOut