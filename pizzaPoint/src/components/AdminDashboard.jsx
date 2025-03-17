import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'

function AdminDashboard() {
  return (
    <>
        <div >
            <AdminNavbar />
            <AdminSidebar />
            <div className='flex flex-col w-screen h-screen'>
                <div className='flex w-full mt-16 ml-16'>
                    <div className='flex flex-col rounded-lg w-[21rem] h-40 bg-black'>
                        <div className='flex w-11/12'>
                            <h3 className='text-2xl text-white'>120</h3>
                            <div className='w-10 h-10 pt-2 rounded-xl text-center bg-gray-800'>
                                <i class="fa-xl fa-regular fa-file"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminDashboard