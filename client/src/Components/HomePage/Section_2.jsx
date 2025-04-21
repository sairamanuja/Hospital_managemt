import React from 'react';
import { useNavigate } from 'react-router-dom';
 import { useAuth } from '../../context/AuthContext';

export const Section_2 = () => {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();

    return (
        <div className="mt-[100px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row bg-[#5F6FFF] h-auto md:h-[250px] w-full rounded-lg mx-auto">
                {/* Text and Button Section */}
                <div className="w-full md:w-[65%] flex flex-col justify-center p-6 md:p-10 text-center md:text-left">
                    <h1 className="text-white text-2xl font-bold mb-4">
                        Book an Appointment
                    </h1>
                    <h1 className="text-white text-2xl mb-4">
                        Book Appointment With 100+ Trusted Doctors
                    </h1>
                   
                   {isLoggedIn ?(
                    <>
                      <button
                        className="bg-white text-black px-4 py-2 rounded-3xl mt-4 w-full md:w-[160px] hover:bg-gray-100 transition duration-300"
                        onClick={() => navigate('/signup')}
                    >
                        Book Now
                    </button>
                    </>
                   ):(
                    <>
 <button
                        className="bg-white text-black px-4 py-2 rounded-3xl mt-4 w-full md:w-[160px] hover:bg-gray-100 transition duration-300"
                        onClick={() => navigate('/signup')}
                    >
                        Create account
                    </button>
                    </>
                   )}
                    
                </div>

                {/* Image Section */}
                <div className="w-full md:w-[41%]  flex justify-center items-center p-4 ">
                    <img
                        src="/assets/HomePage/appointment-doc-img.png"
                        alt="Doctor"
                        className="w-[200px] md:w-[259px] h-auto"
                    />
                </div>
            </div>
        </div>
    );
};