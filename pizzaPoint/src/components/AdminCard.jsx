import React from 'react'

function AdminCard({bgColor, title, number, percentage, iconClass}) {
  return (
    <>
        <div className={`flex flex-col justify-around p-auto rounded-lg w-[21rem] h-40 bg-${bgColor}`}>
            <div className='flex ml-4 justify-between w-11/12'>
                <div>
                    <h2 className='text-2xl text-white'>{number}</h2>
                    <h3 className='text-gray-400'>{title}</h3>
                </div>
                <div className='w-12 h-12 pt-3 rounded-xl text-center bg-gray-800'>
                    <i class={`fa-2xl ${iconClass}`}></i>
                </div>
            </div>
            <div>
                <div className='w-11/12 text-white text-xs'><span style={{ marginLeft: `${percentage}%` }} >45%</span></div>
                <div className='flex h-2 w-11/12 rounded-full bg-gray-800 ml-3'>
                    <div className={`h-full w-[${percentage}%] bg-gray-400 rounded-full`}>
                    </div>
                </div>
            </div>
        </div>
</>
  )
}

export default AdminCard