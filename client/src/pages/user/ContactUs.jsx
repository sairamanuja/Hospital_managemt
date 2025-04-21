import React from 'react';
import { MainLayout } from '../../Components/Layouts/MainLayout';

export const ContactUs = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-4 py-6">
        {/* Heading */}
        <h1 className="text-2xl pt-6 text-center">
          CONTACT <span className="font-bold">US</span>
        </h1>

        {/* Image and Text Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 w-full max-w-6xl">
          {/* Image */}
          <div className="w-full md:w-[50%] flex justify-center items-center">
            <img
              src="/assets/ContactUSPage/contact_image (1).png"
              alt="Contact Us"
              className="w-full h-auto max-w-[300px] md:max-w-none md:w-[70%]"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-[55%] text-center md:text-left">
            {/* Office Details */}
            <h3 className="text-2xl text-gray-500 font-semibold pt-6 md:pt-[10%] pb-6">
              OUR OFFICE
            </h3>
            <p>
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p className="text-gray-500 pt-6">Tel: (415) 555‑0132</p>
            <p className="text-gray-500">Email: greatstackdev@gmail.com</p>

            {/* Careers Section */}
            <h3 className="text-2xl text-gray-500 font-semibold pt-6">
              Careers at PRESCRIPTO
            </h3>
            <p className="pb-6">
              Learn more about our teams and job openings.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};