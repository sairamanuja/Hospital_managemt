
import React from 'react'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between content-center h-20 w-full border-b-2 border-[#ADADAD] mb-5">
      <div className="flex items-center">
        <img className='h-10' src="/src/Assets/HomePage/logo-prescripto.png" alt="" />
      </div>
      <div className="flex gap-3">
        <a className='flex items-center cursor-pointer ' onClick={()=>navigate("/")}>HOME</a>
        <a className='flex items-center' onClick={()=>navigate("/allDoctors")} >ALL DOCTORS</a>
        <a className='flex items-center cursor-pointer' onClick={()=>navigate("/aboutus")}>ABOUT</a>
        <a className='flex items-center cursor-pointer' onClick={()=>navigate("/contactus")}>CONTACT</a>
      </div>
      <div className="flex items-center">
        <button className="p-3 bg-[#5F6FFF] rounded-[20px] text-white "
          onClick={() => navigate('/signup')}>
          create account
        </button>
      </div>
    </div>
  )
}

