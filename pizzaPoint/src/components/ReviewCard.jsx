import React, {useState, useEffect} from 'react'
import serve6 from '../assets/imgs/serve6.webp'
import logoGeneral from '../assets/imgs/logoGeneral.webp'
import { useAuth } from '../utils/useAuth';
import { useCart } from '../utils/CartContext';

function ReviewCard({item, img,title,Initialprice,description,setCardOpen,size, InitialId}) {

    const [accordianOpen, setAccordianOpen] = useState(false);
    const [addOns, setAddOns] = useState([{name: 'Extra Cheese', price: 100,img :logoGeneral}, {name: 'Olives', price: 50, img :logoGeneral}, {name: 'Pepperoni', price: 150, img :logoGeneral}]);
    const [qty, setQty] = useState(1);
    const [sizePizza, setPizzaSize] = useState(size);
    const [price, setprice] = useState(Initialprice);
    const [id, setId] = useState(InitialId);
    const {addToCart}  = useCart();
    const [extras, setExtras] = useState([]);
    const [selectedExtras, setSelectedExtras] = useState([]);
    console.log(price)

    const { token } = useAuth() // ✅ Token directly mil jayega

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedExtras((prevExtras) => [...prevExtras, id]);
        } else {
            setSelectedExtras((prevExtras) => prevExtras.filter(extraId => extraId !== id));
        }
        console.log(selectedExtras)
    };

        useEffect(() => {
            const controller = new AbortController(); // Create controller for aborting requests
            const { signal } = controller; // Extract signal from the controller
        
            async function fetchExtras() {
              try {
                const response = await fetch('http://localhost:8082/api/extras/get/all', {
                  headers: { Authorization: `Bearer ${token}` },
                  signal, // Attach the signal to the fetch request for cancellation
                });
        
                if (!response.ok) {
                  throw new Error(`Failed to fetch: ${response.statusText}`);
                }
        
                const json = await response.json();
                setExtras((prevData) => [...json]); // Prevent overwriting data
              } catch (error) {
                if (error.name !== 'AbortError') {
                  console.log("Error fetching data:", error.message);
                  console.log(token)
                }
              }
            }
        
            fetchExtras();
        
            return () => controller.abort(); // Abort the request when component unmounts or token changes
            
          }, [token]);

        //   console.log(extras)

        useEffect(() => {
        
            async function fetchData() {
                try {
                    const response = await fetch(`http://localhost:8082/api/menuItem/get/name/size?name=${encodeURIComponent(title)}&size=${encodeURIComponent(sizePizza)}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
        
                    const data = await response.json();
                    setprice(data[0].price);
                    setId(data[0].id);
                    console.log("✅ Success:", data);
                } catch (error) {
                    console.error("❌ Error fetching data:", error.message);
                }
            }
        
            fetchData();
        }, [sizePizza, price]); // Runs every time sizePizza changes
        
        function changeSizeToLarge() {
            if (sizePizza !== "LARGE") {
                setPizzaSize("LARGE");
            }
        }
        
        function changeSizeToMedium() {
            if (sizePizza !== "MEDIUM") {
                setPizzaSize("MEDIUM");
            }
        }
        



  return (
    <>
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='flex w-3/4 h-[90%] bg-white rounded-lg'>

                <div className='w-[45%] h-full border-r-2 border-gray-300'>
                    <div className='w-full h-5/7'>
                        <img className="w-[90%] h-full ml-6 mt-6" src={img} alt="" />
                    </div>
                </div>
                <div className='w-[55%] h-full flex flex-col justify-between overflow-y-scroll'>
                    <div className='p-5 flex-col'>
                        <div className='flex justify-between w-full h-auto'>
                            <div className='flex'>
                                <h1 className='text-2xl font-semibold'>{title}</h1>
                                {sizePizza!="REGULAR" && <p onClick={changeSizeToMedium} className={`${sizePizza=="MEDIUM"? "bg-brandRed" : "bg-gray-300"} text-white ml-2 px-3 rounded-2xl self-center hover:scale-105 hover:cursor-pointer`}>Medium</p>}
                                {sizePizza!="REGULAR" && <p onClick={changeSizeToLarge} className={`${sizePizza=="LARGE"? "bg-brandRed" : "bg-gray-300"} text-white ml-2 px-3 rounded-2xl self-center hover:scale-105 hover:cursor-pointer`}>Large</p>}
                            </div>
                            <button className=' mr-2 text-2xl w-7 h-7 bg-brandRed text-white rounded-full' onClick={()=> setCardOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className='w-full mt-3'>
                            <p className='text-lg font-semibold'>{price} HUF</p>
                            <p className='text-lg text-gray-400'>{description}</p>
                        </div>

                       {sizePizza!="REGULAR" && <div className='w-full mt-3 bg-gray-200 flex justify-between rounded-xl hover:cursor-pointer' onClick={()=> setAccordianOpen(!accordianOpen)}>
                            <h2 className='text-lg font p-3'>
                                Choose AddOns
                            </h2>
                            <h2 className='text-blue-600 pr-2 self-center'>
                                {accordianOpen===true ? <i className="fa-solid fa-chevron-up"></i> : <i class="fa-solid fa-chevron-down"></i>}
                            </h2>

                        </div>}
                        {accordianOpen && <div className='flex-col overflow-x-auto w-full gap-4'>

                            {extras.map((item) => (
                                
                                    <div key={item.id} id={item.id} className='flex mt-3'>
                                        <label className='flex'>
                                            <input
                                                type="checkbox"
                                                checked={selectedExtras.includes(item.id)}
                                                onChange={(e) => handleCheckboxChange(e, item.id)}
                                            />
                                            <span className='ml-2'>
                                                <h3 className='text-sm'>{item.name}</h3>
                                                <h3 className='text-xs text-gray-600'>{item.price} HUF</h3>
                                            </span>
                                        </label>
                                    </div>
                                
                            ))}

                        </div>}

                        <div className='mt-4'>
                            <h2 className='mb-2 font-semibold'>Special Instructions</h2>
                            <textarea className='w-full h-40 bg-gray-200 border-2 border-gray-300 rounded-xl p-3' placeholder='Please enter the instructions'></textarea>
                        </div>
                    </div>

                    <div className='flex shrink-0 w-full h-20 border-t-2 border-gray-200'>
                            <div className='flex self-center'>
                                <button className='h-9 w-9 bg-brandRed text-white ml-3 rounded-xl' onClick={()=> qty == 1 ? setQty(qty):setQty(qty-1)}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <h3 className='text-lg font-semibold ml-3 mr-3'>{qty}</h3>
                                <button className='h-9 w-9 bg-brandRed text-white rounded-xl' onClick={()=> setQty(qty+1)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div onClick={() => {addToCart(id, qty, selectedExtras);setCardOpen(false)}} className='h-9 w-3/4 ml-4 pt-1 self-center rounded-lg bg-brandRed text-white text-center hover:cursor-pointer hover:scale-105 transition-transform duration-300'>
                                <h3 className='text-lg font-semibold'>{`Add to Cart - ${price*qty}`}</h3>
                            </div>
                                
                            
                    </div>

                </div>

            </div>
        </div>
    </>
  )
}

export default ReviewCard