import React from 'react'
import {Navbar} from '../Components/Layout/home/Navbar'
import about_image from '../Assets/Aboutus/about_image.png'
const Aboutus = () => {
  return (
    <>
    <div className="w-[80%] m-auto h-screen">
    <Navbar/>
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl pt-6 ">ABOUT <span className="text-2xl font-bold">US</span></h1>
        <div className="flex flex-row justify-between pt-10 ">
            <div className="w-[35%] flex justify-center items-center ">
                <img src={about_image} alt="" />
            </div>
            <div className="w-[60%] ">
                <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. <br /><br />

Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
<br /><br />

<span className="font-bold">Our Vision</span>
<br /><br />
Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
            </div>
        </div>
        
        <p className="text-2xl pt-10 text-left  pb-10 ">WHY  <span className="font-bold">CHOOSE US ?</span></p>
        <div className="flex flex-row justify-between border-2 border-gray-300 ">
            <div className="w-[30%] text-center border-r-2 border-gray-300 p-10">
                <h2 className="font-bold ">EFFICIENCY:</h2>
                <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
            </div>
            <div className="w-[30%] text-center border-r-2 border-gray-300 p-8">
                <h2 className="font-bold">CONVENIENCE:</h2>
                <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
            </div>
            <div className="w-[30%] text-center p-10">
                <h2 className="font-bold">PERSONALIZATION:</h2>
                <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
            </div>
        </div>

    </div>
    </div>

    </>
  )
}

export default Aboutus  