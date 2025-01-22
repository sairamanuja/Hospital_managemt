import React from 'react'
import {Navbar} from '../Components/Layout/home/Navbar'
const Profile = () => {
  return (
    <>
    <div className="w-[80%] m-auto h-screen">
    <Navbar/>
    <div className="">
        <img src="../Assets/profile/profile_pic.png" alt="" className="w-[10%] h-[10%] rounded-full" />
        <h1 className="border-b-2 border-gray-300 pt-4 pb-1 text-2xl font-bold w-[50%]">John Doe</h1>
        <p className="text-gray-500 underline-offset-4 underline pt-4">CONTACT INFORMATION</p>
        <p className="pt-2">Email: john.doe@example.com</p>
        <p className="pt-2">Phone: +123 456 7890</p>
        <p className="pt-2">Address: 123 Main St, City, Country</p>
        <p className="text-gray-500 underline-offset-4 underline pt-4">BASIC INFORMATION</p>
        <p className="pt-2">Gender: Male</p>
        <p className="pt-2">Date of Birth: 12/12/1990</p>
        <div className="flex flex-row gap-4">
            <button className="bg-blue-500 text-white p-2 rounded-md mt-4">Edit</button>
            <button className="bg-blue-500 text-white p-2 rounded-md mt-4">Save Information</button>

        </div>


    </div>
   
    </div>
    </>
)
}

export default Profile