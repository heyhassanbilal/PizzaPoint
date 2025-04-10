import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'
import AdminCard from './AdminCard'

function AdminDashboard() {

    let arr = [
        {ID : 12345, date :"Jan 24th, 2020", customerName: "Roberto Carlo", Location : "Petofi ter-6 debrecen", Amount : 3000, orderStatus : "Pending"},
        {ID : 12365, date :"Jan 24th, 2020", customerName: "Roberto Carlo", Location : "Petofi ter-6 debrecen", Amount : 3000, orderStatus : "Pending"},
        {ID : 12344, date :"Jan 24th, 2020", customerName: "Roberto Carlo", Location : "Petofi ter-6 debrecen", Amount : 3000, orderStatus : "Pending"},
        {ID : 12333, date :"Jan 24th, 2020", customerName: "Roberto Carlo", Location : "Petofi ter-6 debrecen", Amount : 3000, orderStatus : "Pending"},
    ];

  return (
    <>
        <div >
            <AdminNavbar />
            <AdminSidebar />
            <div className='flex flex-col gap-9 w-screen h-screen mt-24 ml-24'>
                <div className='flex gap-5 w-full '>
                    <AdminCard title="Total Menus" number="120" bgColor="black" percentage={45} iconClass={"fa-regular fa-file"}/>
                    <AdminCard title="Total Menus" number="120" bgColor="black" percentage={45} iconClass={"fa-regular fa-file"}/>
                    <AdminCard title="Total Menus" number="120" bgColor="black" percentage={45} iconClass={"fa-regular fa-file"}/>
                    <AdminCard title="Total Menus" number="120" bgColor="black" percentage={45} iconClass={"fa-regular fa-file"}/>
                </div>
                <div className='h-auto w-11/12 p-6 rounded-lg border-2 shadow-lg'>
                    <div className='flex justify-between'>
                        <h2 className='font-semibold text-xl'>Order List</h2>
                        <div className='bg-gray-200 flex rounded-lg'>
                            <h3 className='bg-black text-white rounded-l-lg p-2'>Monthly</h3>
                            <h3 className='p-2 border-x-2 border-gray-300'>Weekly</h3>
                            <h3 className=' p-2 rounded-r-lg'>Today</h3>
                        </div>
                    </div>

                    <div className='mt-7'>
                    <table className="min-w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 text-sm">
                    
                                        <th className="pb-3 font-medium">
                                            <div className="flex items-center">
                                                ID
                                            </div>
                                        </th>

                                        <th className="pb-3 font-medium">Date</th>

                                        <th className="pb-3 font-medium">
                                            <div className="flex items-center">
                                                Customer Name
                                            </div>
                                        </th>

                                        <th className="pb-3 font-medium">Location</th>

                                        <th className="pb-3 font-medium">
                                            <div className="flex items-center">
                                                Amount 
                                            </div>
                                        </th>

                                        <th className="pb-3 font-medium">
                                            <div className="flex items-center">
                                                Status Order
                                            </div>
                                        </th>
                                        
                                        <th className="pb-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arr.map((item)=>(
                                        <tr className="border-t">
                                            <td className="py-4">#{item.ID}</td>
                                            <td className="py-4">{item.date}</td>
                                            <td className="py-4">{item.customerName}</td>
                                            <td className="py-4">{item.Location}</td>
                                            <td className="py-4">${item.Amount}</td>
                                            <td className="py-4">
                                            <div className="flex items-center">
                                                <span className="w-2 h-2 bg-gray-800 rounded-full mr-1"></span>
                                                <span>{item.orderStatus}</span>
                                            </div>
                                            </td>
                                            <td className="py-4">
                                            <button>
                                                : :
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="border-t">
                                        <td className="py-4">#12345</td>
                                        <td className="py-4">Jan 24th, 2020</td>
                                        <td className="py-4">Roberto Carlo</td>
                                        <td className="py-4">Corner Street 5th Londo</td>
                                        <td className="py-4">$34.20</td>
                                        <td className="py-4">
                                        <div className="flex items-center">
                                            <span className="w-2 h-2 bg-gray-800 rounded-full mr-1"></span>
                                            <span>New Order</span>
                                        </div>
                                        </td>
                                        <td className="py-4">
                                        <button>
                                            : :
                                        </button>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        
                                        <td className="py-4">#12366</td>
                                        <td className="py-4">Jan 22th, 2020</td>
                                        <td className="py-4">Rohmad Khair</td>
                                        <td className="py-4">Lando Street 5th Yogos</td>
                                        <td className="py-4">$44.25</td>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                                                <span className="text-blue-400">On Delivery</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                        <button>
                                            : :
                                        </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default AdminDashboard