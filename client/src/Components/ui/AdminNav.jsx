import React from 'react'
import logo from '../../Assets/HomePage/logo-prescripto.png'
const AdminNav = () => {
  return (
    <div className='flex flex-row justify-between items-center p-4 border-b-2 border-gray-300'>
        <div className='flex flex-row justify-between items-center'>
            <img src={logo} alt="" className='w-[80%] '/>
            <span className='text-sm font-semibold text-end translate-y-3 -translate-x-2   '>Admin</span>
        </div>
        <div className="flex flex-row justify-end items-center">
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>login</button>
        </div>
    </div>
  )
}

export default AdminNav