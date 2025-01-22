import React from 'react'

export const Navbar = () => {
  return (
    <div className="flex justify-between content-center h-20 w-full border-b-2 border-[#ADADAD] mb-5">
      <div className="flex items-center">
        <img className='h-10' src="/src/Assets/HomePage/logo-prescripto.png" alt="" />
      </div>
      <div className="flex gap-3">
        <a className='flex items-center' href="">HOME</a>
        <a className='flex items-center' href="">ALL DOCTORS</a>
        <a className='flex items-center' href="">ABOUT</a>
        <a className='flex items-center' href="">CONTACT</a>
      </div>
      <div className="flex items-center">
        <button className="p-3 bg-[#5F6FFF] rounded-[20px] text-white">
          create account
        </button>
      </div>
    </div>
  )
}

