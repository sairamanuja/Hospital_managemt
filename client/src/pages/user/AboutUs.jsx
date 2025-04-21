import React from 'react';
import { MainLayout } from '../../Components/Layouts/MainLayout';

export const AboutUs = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-4 py-6">
        <h1 className="text-2xl pt-6 text-center">
          ABOUT <span className="font-bold">US</span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 w-full max-w-6xl">
          <div className="w-full md:w-[35%] flex justify-center items-center">
            <img
              src="/assets/Aboutus/about_image.png"
              alt="About Us"
              className="w-full h-auto max-w-[300px] md:max-w-none"
            />
          </div>

          <div className="w-full md:w-[60%] text-justify">
            <p>
              Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. <br /><br />

              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
              <br /><br />

              <span className="font-bold">Our Vision</span>
              <br /><br />
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>

        <h2 className="text-2xl pt-10 text-center pb-6">
          WHY <span className="font-bold">CHOOSE US?</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center border-2 border-gray-300 w-full max-w-6xl">
         
          <div className="w-full md:w-[30%] text-center border-b-2 md:border-b-0 md:border-r-2 border-gray-300 p-6">
            <h2 className="font-bold text-lg">EFFICIENCY:</h2>
            <p className="mt-2">Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
          </div>

        
          <div className="w-full md:w-[30%] text-center border-b-2 md:border-b-0 md:border-r-2 border-gray-300 p-6">
            <h2 className="font-bold text-lg">CONVENIENCE:</h2>
            <p className="mt-2">Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>

          
          <div className="w-full md:w-[30%] text-center p-6">
            <h2 className="font-bold text-lg">PERSONALIZATION:</h2>
            <p className="mt-2">Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};