import React from 'react'

function AddressCard({index, address}) {
  return (
    <>
        <div key={index} className={`${address.selected == 1 ? "border-brandRed" : "border-gray-400"} border-2 flex flex-col justify-evenly w-96 h-44 text-center p-2 rounded-xl hover:scale-105 transform transition hover:cursor-pointer`}>
                      <h3 className='text-xl font-semibold text-pretty'>
                        
                        {`${address.street}
                        `}
                      
                      </h3>

                      <div>

                        <h3 className='text-pretty'>
                          
                          {`
                          ${address.buildingName}, 
                          Apartment Number - ${address.apartmentNo}, 
                          
                          `}
                        
                        </h3>
                        <h3 className='text-pretty'>
                          
                          {`
                          
                          Floor - ${address.floor}
                          
                          `}
                        
                        </h3>
                        <h3 className='text-pretty'>
                          
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
  )
}

export default AddressCard