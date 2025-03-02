import React, {useState} from 'react'
import serve6 from '../assets/imgs/serve6.webp'
import logoGeneral from '../assets/imgs/logoGeneral.webp'

function ReviewCard({img,title,price,description,setCardOpen,size}) {

    const [accordianOpen, setAccordianOpen] = useState(false);
    const [addOns, setAddOns] = useState([{name: 'Extra Cheese', price: 100,img :logoGeneral}, {name: 'Olives', price: 50, img :logoGeneral}, {name: 'Pepperoni', price: 150, img :logoGeneral}]);
    const [qty, setQty] = useState(1);
  return (
    <>
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='flex w-3/4 h-[90%] bg-white rounded-lg'>

                <div className='w-[45%] h-full border-r-2 border-gray-300'>
                    <div className='w-full h-5/7'>
                        <img className="w-[90%] h-full ml-6 mt-6" src={img} alt="" />
                    </div>
                </div>
                <div className='w-[55%] h-full flex flex-col justify-between'>
                    <div className='p-5 flex-col'>
                        <div className='flex justify-between w-full h-auto'>
                            <div className='flex'>
                                <h1 className='text-2xl font-semibold'>{title}</h1>
                                {size && <p className='bg-brandRed text-white ml-2 px-3 rounded-2xl self-center'>{size}</p>}
                            </div>
                            <button className=' mr-2 text-2xl w-7 h-7 bg-brandRed text-white rounded-full' onClick={()=> setCardOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className='w-full mt-3'>
                            <p className='text-lg font-semibold'>{price} HUF</p>
                            <p className='text-lg text-gray-400'>{description}</p>
                        </div>

                        <div className='w-full mt-3 bg-gray-200 flex justify-between rounded-xl hover:cursor-pointer' onClick={()=> setAccordianOpen(!accordianOpen)}>
                            <h2 className='text-lg font p-3'>
                                Choose AddOns
                            </h2>
                            <h2 className='text-blue-600 pr-2 self-center'>
                                {accordianOpen===true ? <i class="fa-solid fa-chevron-up"></i> : <i class="fa-solid fa-chevron-down"></i>}
                            </h2>

                        </div>
                        {accordianOpen && <div className='flex overflow-x-auto w-full gap-4'>
                            {addOns.map((item)=>(<div className='flex'>
                                <div className='flex-col mt-3'>
                                    <img src={item.img} className='w-32 h-32 border-2 border-gray-300 rounded-lg' alt=''></img>
                                    <h3 className='text-sm'>{item.name}</h3>
                                    <h3 className='text-xs text-gray-600'>{item.price} HUF</h3>
                                </div>
                            </div>))}
                        </div>}

                        <div className='mt-4'>
                            <h2 className='mb-2 font-semibold'>Special Instructions</h2>
                            <textarea className='w-full h-40 bg-gray-200 border-2 border-gray-300 rounded-xl p-3' placeholder='Please enter the instructions'></textarea>
                        </div>
                    </div>

                    <div className='flex w-full h-20 border-t-2 border-gray-200'>
                            <div className='flex self-center'>
                                <button className='h-9 w-9 bg-brandRed text-white ml-3 rounded-xl' onClick={()=> qty == 1 ? setQty(qty):setQty(qty-1)}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <h3 className='text-lg font-semibold ml-3 mr-3'>{qty}</h3>
                                <button className='h-9 w-9 bg-brandRed text-white rounded-xl' onClick={()=> setQty(qty+1)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div className='h-9 w-3/4 ml-4 pt-1 self-center rounded-lg bg-brandRed text-white text-center'>
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