import React from 'react'
import { Navbar } from '../Components/Layout/home/Navbar';
import contact_image from '../Assets/ContactUSPage/contact_image (1).png'
const ContactUs = () => {
  return (
    <div className="w-[80%] m-auto h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center  ">
       <h1 className="text-2xl pt-6 ">CONTACT <span className="text-2xl font-bold">US</span></h1>
       <div className="flex flex-row justify-between pt-10 ">
        <div className="w-[50%] flex justify-center items-center ">
            <img src={contact_image}  alt="" className="w-[70%]  " />
        </div>
        <div className="w-[55%] ">

            <h3 className="text-2xl text-gray-500 font-semibold pt-[10%] pb-6"> OUR OFFICE</h3>
            <p>54709 Willms Station <br />
            Suite 350, Washington, USA</p>
            <p className="text-500 pt-6">Tel: (415) 555‑0132</p>
            
            <p className="text-500 ">Email: greatstackdev@gmail.com</p>
             <h3 className="text-2xl text-gray-500 font-semibold pt-6">Careers at PRESCRIPTO </h3>
             <p className="pb-6">Learn more about our teams and job openings.</p>
             <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Explore Jobs</button>
        </div>
       </div>
      </div>
    </div>
  )
}

export default ContactUs    