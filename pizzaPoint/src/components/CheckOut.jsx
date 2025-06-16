import {useState, useEffect} from 'react'
import Navbar from './Navbar'
import { useCart } from '../utils/CartContext';
import { useAuth } from "../utils/useAuth";
import { useNavigate } from 'react-router-dom';
import { addressService } from "../utils/services";
import { Link } from 'react-router-dom';

function CheckOut() {
    const navigate = useNavigate();
    const mapsUrl =
    "https://www.google.com/maps/dir//Debrecen,+Bajcsy-Zsilinszky+u.+2,+4025/@47.5299425,21.5413505,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47470f3d86380899:0xfa6293ed61880b6!2m2!1d21.623751!2d47.529972?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D";

    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [check, setCheck] = useState();
    // const [data, setData] = useState();
    
    const [orderType,setOrderType] = useState("PICKUP");
    let paymentMethod = "CASH";
    const {cart, setCart} = useCart();
    const {email, token} = useAuth(); 
    // const BASE_URL = 'http://localhost:8082';
    const BASE_URL =  'https://pizzapoint-c71ca9db8a73.herokuapp.com';

    const fetchAddresses = async() => {
        const data = await addressService.fetchAllAddresses();
        if (data.length == 0){
            navigate("/address")
        }
    };
    
    async function getSelectedAddress() {
        try {
            const response = await fetch(`${BASE_URL}/api/address/selected?isSelected=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                navigate("/address");
                throw new Error('Error fetching selected address');
            }

            const data = await response.json();
            setSelectedAddresses(data);
            console.log(data, "selectedAddresses-----------------");

        } catch (error) {
            console.error('Error fetching selected address:', error);
            navigate("/address");
            // alert('Error fetching selected address: ' + error.message);
        }
    }
    // useEffect(() => {
    //     fetchAddresses();
    // },[])

    // useEffect(() => {
    //     getSelectedAddress();
    // },[])

    const runPickupCheckout = async (controller) => {
        try {
            const response = await fetch(`${BASE_URL}/api/orders/pickup-checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                signal: controller.signal,
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Checkout failed: ${errorText}`);
            }
            
            const data = await response.json();
            setCheck(data);
            console.log(data, "PickUp Checkout successful");
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Checkout error:', error);
                alert(`Checkout error: ${error.message}`);
            }
        }
    };
    const runDeliveryCheckout = async (controller) => {
        try {
            const response = await fetch(`${BASE_URL}/api/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                signal: controller.signal,
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Checkout failed: ${errorText}`);
            }
            
            const data = await response.json();
            setCheck(data);
            console.log(data, "PickUp Checkout successful");
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Checkout error:', error);
                // alert(`Checkout error: ${error.message}`);
            }
        }
    };
    useEffect(() => {
        const controller = new AbortController();
    
        runPickupCheckout(controller);
    
        return () => controller.abort();
    }, [token]);

    const handlePlaceOrder = async () => {
        try {
            // console.log(cart, "cart first-----------------");
            const response = await fetch(`${BASE_URL}/api/orders/placeorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
                body: new URLSearchParams({ orderId: check.orderId,paymentMethod: paymentMethod, orderType: orderType }),
                credentials: 'include',
            });

            // console.log(cart, "cart-----------------");
    
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error placing order:', errorData);
                alert('There was an issue with your order: ' + errorData);
            } else {
                const data = await response.json();
                console.log("✅ Success:", data);
                // alert("Order placed successfully!"); 
                navigate(`/orders/${check.orderId}`);
                localStorage.removeItem("cart");
                setCart([]);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const cartItems = cart && cart.cartItems ? cart.cartItems : [];

    const handleOrderType = async (type) => {
        if (type == orderType) return;
        setOrderType(type);
        if (type === "PICKUP") {
            await runPickupCheckout(new AbortController());
        } else if (type === "DELIVERY") {
            await getSelectedAddress();
            await runDeliveryCheckout(new AbortController());
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className='w-full min-h-screen flex flex-col lg:flex-row bg-brandRed px-4'>
                {/* Left Column - Order Details */}
                <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-end mt-20 lg:mt-32 mb-8'>
                    {/* Delivery/Pickup Toggle */}
                    <div className='flex w-full max-w-md lg:max-w-xl h-12 rounded-full bg-white items-center p-1'>
                        <div className={`${orderType == "DELIVERY" ? "bg-brandRed text-white": "text-brandRed"} w-1/2 h-full rounded-full text-center flex items-center justify-center hover:cursor-pointer`} onClick={() => handleOrderType("DELIVERY")}>
                            <h3>Delivery</h3>
                        </div>
                        <div className={`${orderType == "PICKUP" ? "bg-brandRed text-white": "text-brandRed"} w-1/2 rounded-full h-full flex items-center justify-center hover:cursor-pointer` } onClick={() => handleOrderType("PICKUP")}>
                            <h3>Pickup</h3>
                        </div>
                    </div>

                    {/* Order Details Sections */}
                    <div className='flex flex-col w-full max-w-md lg:max-w-xl text-white mt-6 lg:mt-10'>
                        {/* Where Section */}
                        <h2 className='text-xl lg:text-2xl font-semibold'>Where?</h2>

                        {orderType === "PICKUP" && (
                            <div className='w-full flex flex-col mt-3 lg:mt-4 px-3 lg:px-4 rounded-xl border-2 border-white'>
                                <div className='flex justify-between py-3 lg:py-5 border-b-[1px] border-gray-400 hover:cursor-pointer' onClick={() => window.open(mapsUrl, "_blank")}>
                                    <div className='flex items-center'>
                                        {/* <i className="fa-solid fa-house text-sm lg:text-base"></i> */}
                                        {/* <h5 className='ml-3 lg:ml-7 mr-2 lg:mr-5 text-sm lg:text-base'>{selectedAddresses.buildingName}</h5> */}
                                        <p className='text-xs lg:text-sm text-gray-300'>Debrecen, Bajcsy-Zsilinszky u. 2, 4025</p>
                                    </div>
                                    {/* <p><i className="fa-solid fa-chevron-right"></i></p> */}
                                </div>
                            </div>

                        )}
                        {orderType === "DELIVERY" && (
                            <div className='w-full flex flex-col mt-3 lg:mt-4 px-3 lg:px-4 rounded-xl border-2 border-white'>
                                <div className='flex justify-between py-3 lg:py-5 border-b-[1px] border-gray-400 hover:cursor-pointer' onClick={() => {navigate("/address")}}>
                                    <div className='flex items-center'>
                                        <i className="fa-solid fa-house text-sm lg:text-base"></i>
                                        <h5 className='ml-3 lg:ml-7 mr-2 lg:mr-5 text-sm lg:text-base'>{selectedAddresses.buildingName}</h5>
                                        {/* <p className='text-xs lg:text-sm text-gray-300'>Petofi ter 6</p> */}
                                    </div>
                                    <p><i className="fa-solid fa-chevron-right"></i></p>
                                </div>
                                <div className='flex justify-between py-3 lg:py-5'>
                                    <div className='flex items-center'>
                                        <i className="fa-solid fa-house text-sm lg:text-base"></i>
                                        <h5 className='ml-3 lg:ml-7 mr-2 lg:mr-5 text-sm lg:text-base'>Leave at the door</h5>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer"/>
                                        <div className="w-9 lg:w-11 h-5 lg:h-6 border-[1px] border-gray-400 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-brandRed peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 lg:after:h-5 after:w-4 lg:after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                            
                        )}

                        {/* When Section */}
                        <h2 className='text-xl lg:text-2xl font-semibold mt-6 lg:mt-8'>When?</h2>

                        <div className='w-full h-14 lg:h-16 mt-3 lg:mt-4 rounded-xl lg:rounded-2xl border-2 border-white pl-3 lg:pl-5 flex flex-col justify-center'>
                            <h6 className='font-bold text-base lg:text-lg'>Standard</h6>
                            <p className='text-xs lg:text-sm text-gray-300'>40-50 min</p>
                        </div>

                        {/* Order Items Section */}
                        <h2 className='text-xl lg:text-2xl font-semibold mt-6 lg:mt-8'>Order Items</h2>
                        <div>
                            <div className='flex flex-col mt-3 lg:mt-4 gap-3 lg:gap-4 border-2 border-white rounded-lg p-3 lg:p-4'>
                                {cartItems && cartItems.map((item) => item.quantity > 0 && (
                                    <div key={item.id} className='flex justify-between w-full h-14 lg:h-16 px-2'>
                                        <div className='flex'>
                                            <img src={item.menuItem.imageUrl} alt="food" className='w-14 h-14 lg:w-16 lg:h-16 rounded-lg object-cover'/>
                                            <div className='flex flex-col ml-2 lg:ml-4 justify-center'>
                                                <h3 className='text-white font-bold text-sm lg:text-base'>{item.menuItem.name}</h3>
                                                {item.extras[0] && <h5 className='text-xs lg:text-sm text-gray-300'>
                                                    Extras: {item.extras.map((extra) => extra.name).join(", ")}
                                                </h5>}
                                                <h5 className='text-xs lg:text-sm text-gray-300'>HUF {item.totalPrice}</h5>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <h3 className='text-sm lg:text-base'>x{item.quantity}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link to="/" className="mt-2 text-sm lg:text-base">+ Add more items</Link>

                        {/* Payment Section */}
                        <h2 className='text-xl lg:text-2xl font-semibold mt-6 lg:mt-8 mb-3 lg:mb-4'>Payment</h2>

                        <div className='flex justify-between w-full h-16 lg:h-20 p-3 lg:p-4 mb-4 border-2 rounded-xl lg:rounded-2xl border-gray-400'>
                            <div className='flex gap-3 lg:gap-5 items-center'>
                                <i className="fa-solid fa-sack-dollar text-lg lg:text-xl"></i>
                                <div className='flex flex-col'>
                                    <h3 className='text-white font-bold text-sm lg:text-base'>Cash or Card on Delivery</h3>
                                    <p className='text-xs lg:text-sm text-gray-300'>The chosen payment method will be charged</p>
                                </div>
                            </div>
                            <i className="fa-solid fa-chevron-right self-center"></i>
                        </div>
                    </div>
                </div>

                {/* Right Column - Summary */}
                <div className='w-full lg:w-1/2 flex justify-center pb-8 lg:pb-0'>
                    <div className='w-full max-w-md lg:max-w-sm lg:fixed h-auto rounded-lg flex flex-col p-4 lg:p-8 justify-around bg-white mb-8 lg:mt-32'>
                        <h2 className='text-xl lg:text-2xl font-bold text-brandRed pb-3 lg:pb-4 border-b-2'>Summary</h2>

                        <div className='flex flex-col mt-3 lg:mt-4 gap-2 lg:gap-4'>
                            <div className='flex justify-between text-brandRed'>
                                <h4 className='text-sm lg:text-base'>Item Subtotal</h4>
                                <h4 className='text-sm lg:text-base'>HUF {check != undefined ? check.totalCartAmount: 0}</h4>
                            </div>
                            <div className='flex justify-between text-brandRed'>
                                <h4 className='text-sm lg:text-base'>Bottle Deposit</h4>
                                <h4 className='text-sm lg:text-base'>HUF {check !=undefined ? check.bottleDepositFee : 0}</h4>
                            </div>
                            <div className='flex justify-between text-brandRed'>
                                <h4 className='text-sm lg:text-base'>Service fee</h4>
                                <h4 className='text-sm lg:text-base'>HUF {check !=undefined ? check.serviceFee : 0}</h4>
                            </div>
                            {orderType == "DELIVERY" && (<div className='flex justify-between text-brandRed'>
                                <h4 className='text-sm lg:text-base'>Delivery</h4>
                                <h4 className='text-sm lg:text-base'>HUF {check !=undefined ? check.deliveryFee : 0}</h4>
                            </div>)}
                            {orderType == "PICKUP" && (<div className='flex justify-between text-brandRed'>
                                <h4 className='text-sm lg:text-base'>Delivery</h4>
                                <h4 className='text-sm lg:text-base'>HUF 0</h4>
                            </div>)}
                            {orderType == "DELIVERY" && (<div className='flex justify-between text-brandRed font-bold'>
                                <h4 className='text-sm lg:text-base'>Total</h4>
                                <h4 className='text-sm lg:text-base'>HUF {check !=undefined ? check.totalPrice : 0}</h4>
                            </div>)}
                            {orderType == "PICKUP" && (<div className='flex justify-between text-brandRed font-bold'>
                                <h4 className='text-sm lg:text-base'>Total</h4>
                                <h4 className='text-sm lg:text-base'>HUF {check !=undefined ? check.totalPrice - check.deliveryFee : 0}</h4>
                            </div>)}
                        </div>

                        <button 
                            className='w-full h-10 lg:h-12 bg-brandRed text-white font-bold rounded-lg mt-4 text-sm lg:text-base' 
                            onClick={() => {
                                handlePlaceOrder();
                                
                            }}
                        >
                            Place order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut