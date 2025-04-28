import React, {useState, useEffect} from 'react'
import serve6 from '../assets/imgs/serve6.webp'
import logoGeneral from '../assets/imgs/logoGeneral.webp'
import { useAuth } from '../utils/useAuth';
import { useCart } from '../utils/CartContext';
import { useNavigate } from 'react-router-dom';
import { productService } from '../utils/services';

function ReviewCard({item, img,title,Initialprice,description,setCardOpen,size, InitialId}) {

    const navigate = useNavigate();
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

    const { token, isAuthenticated } = useAuth() // ✅ Token directly mil jayega

    const handleCheckboxChange = (event, id, money) => {
        if (event.target.checked) {
            setSelectedExtras((prevExtras) => [...prevExtras, id]);
            setprice((prevPrice) => prevPrice + money); // Add the price of the selected extra
            console.log(money, price);
        } else {
            setSelectedExtras((prevExtras) => prevExtras.filter(extraId => extraId !== id));
            setprice((prevPrice) => prevPrice - money); // Subtract the price of the unselected extra
            console.log(money, price);
        }
        console.log(selectedExtras)
    };

        useEffect(() => {
            const controller = new AbortController(); // Create controller for aborting requests
            const { signal } = controller; // Extract signal from the controller
        
            async function fetchExtras() {
              try {
                // const response = await fetch('http://localhost:8082/api/extras/get/all', {
                //   headers: { Authorization: `Bearer ${token}` },
                //   signal, 
                // });
        
                // if (!response.ok) {
                //   throw new Error(`Failed to fetch: ${response.statusText}`);
                // }
        
                const json = await productService.getExtras();
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
                    // const response = await fetch(`http://localhost:8082/api/menuItem/get/name/size?name=${encodeURIComponent(title)}&size=${encodeURIComponent(sizePizza)}`, {
                    //     headers: { Authorization: `Bearer ${token}` },
                    // });
        
                    const data = await productService.getProductByNameAndSize({ name: title, size: sizePizza });
                    setprice(data[0].price);
                    setId(data[0].id);
                    console.log("✅ Success:", data);
                } catch (error) {
                    console.error("❌ Error fetching data:", error.message);
                }
            }
        
            fetchData();
        }, [sizePizza]); // Runs every time sizePizza changes
        
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

        function handleAddToCart(){
            console.log(isAuthenticated())
            if (isAuthenticated()) {
                addToCart(id, qty, selectedExtras);
                setCardOpen(false)
            }else{
                navigate("/login");
            }
        }
        



        return (
            <>
              <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
                <div className='flex flex-col md:flex-row w-full md:w-4/5 lg:w-3/4 h-full md:h-[90%] bg-white rounded-lg overflow-hidden'>
                  
                  {/* Image Section */}
                  <div className='w-full md:w-[45%] h-64 md:h-full border-b-2 md:border-b-0 md:border-r-2 border-gray-300'>
                    <div className='w-full h-full flex items-center justify-center p-4'>
                      <img 
                        className="w-full h-full object-contain" 
                        src={img} 
                        alt={title} 
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className='w-full md:w-[55%] h-full flex flex-col justify-between overflow-y-auto'>
                    <div className='p-3 md:p-5 flex-col'>
                      {/* Header */}
                      <div className='flex justify-between w-full h-auto'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <h1 className='text-xl md:text-2xl font-semibold'>{title}</h1>
                          <div className='flex gap-2 mt-1 md:mt-0'>
                            {sizePizza !== "REGULAR" && (
                              <>
                                <p 
                                  onClick={changeSizeToMedium} 
                                  className={`${sizePizza === "MEDIUM" ? "bg-brandRed" : "bg-gray-300"} text-white px-2 md:px-3 py-1 text-sm rounded-2xl self-center hover:scale-105 hover:cursor-pointer`}
                                >
                                  Medium
                                </p>
                                <p 
                                  onClick={changeSizeToLarge} 
                                  className={`${sizePizza === "LARGE" ? "bg-brandRed" : "bg-gray-300"} text-white px-2 md:px-3 py-1 text-sm rounded-2xl self-center hover:scale-105 hover:cursor-pointer`}
                                >
                                  Large
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <button 
                          className='mr-2 text-xl md:text-2xl w-7 h-7 bg-brandRed text-white rounded-full flex items-center justify-center' 
                          onClick={() => setCardOpen(false)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
          
                      {/* Price and Description */}
                      <div className='w-full mt-3'>
                        <p className='text-base md:text-lg font-semibold'>{price} HUF</p>
                        <p className='text-sm md:text-base text-gray-400'>{description}</p>
                      </div>
          
                      {/* AddOns Section */}
                      {sizePizza !== "REGULAR" && (
                        <div 
                          className='w-full mt-3 bg-gray-200 flex justify-between rounded-xl hover:cursor-pointer' 
                          onClick={() => setAccordianOpen(!accordianOpen)}
                        >
                          <h2 className='text-base md:text-lg p-2 md:p-3'>
                            Choose AddOns
                          </h2>
                          <h2 className='text-blue-600 pr-2 self-center'>
                            {accordianOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                          </h2>
                        </div>
                      )}
                      
                      {/* AddOns Items */}
                      {accordianOpen && (
                        <div className='flex-col w-full gap-2 md:gap-4'>
                          {extras.map((item) => (
                            <div key={item.id} id={item.id} className='flex mt-2 md:mt-3'>
                              <label className='flex'>
                                <input
                                  type="checkbox"
                                  checked={selectedExtras.includes(item.id)}
                                  onChange={(e) => handleCheckboxChange(e, item.id, item.price)}
                                />
                                <span className='ml-2'>
                                  <h3 className='text-xs md:text-sm'>{item.name}</h3>
                                  <h3 className='text-xs text-gray-600'>{item.price} HUF</h3>
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
          
                      {/* Special Instructions */}
                      <div className='mt-3 md:mt-4'>
                        <h2 className='mb-1 md:mb-2 font-semibold text-sm md:text-base'>Special Instructions</h2>
                        <textarea 
                          className='w-full h-24 md:h-40 bg-gray-200 border-2 border-gray-300 rounded-xl p-2 md:p-3 text-sm' 
                          placeholder='Please enter the instructions'
                        ></textarea>
                      </div>
                    </div>
          
                    {/* Bottom Cart Actions */}
                    <div className='flex flex-wrap md:flex-nowrap shrink-0 w-full py-3 px-2 md:h-20 border-t-2 border-gray-200 gap-2 md:gap-0'>
                      <div className='flex w-full md:w-auto justify-center align-middle items-center'>
                        <button 
                          className='h-8 w-8 md:h-9 md:w-9 bg-brandRed text-white rounded-xl flex items-center justify-center' 
                          onClick={() => qty === 1 ? setQty(qty) : setQty(qty - 1)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <h3 className='text-base md:text-lg font-semibold mx-3'>{qty}</h3>
                        <button 
                          className='h-8 w-8 md:h-9 md:w-9 bg-brandRed text-white rounded-xl flex items-center justify-center' 
                          onClick={() => setQty(qty + 1)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <div 
                        onClick={() => {handleAddToCart()}} 
                        className='mt-2 w-full md:w-3/4 h-10 md:h-9 ml-0 md:ml-4 py-2 md:pt-1 flex items-center justify-center rounded-lg bg-brandRed text-white hover:cursor-pointer hover:scale-105 transition-transform duration-300'
                      >
                        <h3 className='text-base md:text-lg font-semibold'>{`Add to Cart - ${price * qty}`}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
}

export default ReviewCard