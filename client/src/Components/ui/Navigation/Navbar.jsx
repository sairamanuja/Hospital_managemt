import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full border-b-2 border-[#ADADAD] mb-5 px-4 md:px-8 py-4">
      {/* Logo Section */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <img
          className="h-10 cursor-pointer"
          src="/assets/HomePage/logo-prescripto.png"
          alt="Logo"
          onClick={() => navigate('/')}
        />
        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links and Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto items-center`}
      >
        <a
          className="flex items-center cursor-pointer p-2 md:p-0 hover:text-[#5F6FFF]"
          onClick={() => navigate('/')}
        >
          HOME
        </a>
        <a
          className="flex items-center cursor-pointer p-2 md:p-0 hover:text-[#5F6FFF]"
          onClick={() => navigate('/allDoctors')}
        >
          ALL DOCTORS
        </a>
        <a
          className="flex items-center cursor-pointer p-2 md:p-0 hover:text-[#5F6FFF]"
          onClick={() => navigate('/aboutus')}
        >
          ABOUT
        </a>
        <a
          className="flex items-center cursor-pointer p-2 md:p-0 hover:text-[#5F6FFF]"
          onClick={() => navigate('/contactus')}
        >
          CONTACT
        </a>

        {/* Conditional Rendering for Profile Dropdown or Create Account Button */}
        {isLoggedIn ? (
          <>
            {/* Profile Dropdown (Desktop Only) */}
            <div className="hidden md:block relative">
              <button
                className="flex items-center cursor-pointer p-2 md:p-0 hover:text-[#5F6FFF]"
                onClick={toggleProfileDropdown}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="/path-to-profile-icon.png"
                  alt="Profile"
                />
              </button>
              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <a
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/profile')}
                  >
                    My Profile
                  </a>
                  <a
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/appointments')}
                  >
                    My Appointments
                  </a>
                  <a
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={logout}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu (Profile, Appointments, Logout) */}
            <div className="md:hidden w-full flex flex-col items-center gap-2">
             
              <a
                className="flex items-center cursor-pointer p-2 hover:text-[#5F6FFF]"
                onClick={() => navigate('/profile')}
              >
                My Profile
              </a>
            
              <a
                className="flex items-center cursor-pointer p-2 hover:text-[#5F6FFF]"
                onClick={() => navigate('/appointments')}
              >
                My Appointments
              </a>
              <a
                className="flex items-center cursor-pointer p-2 hover:text-[#5F6FFF]"
                onClick={logout}
              >
                Logout
              </a>
            </div>
          </>
        ) : (
          <button
            className="md:hidden w-full p-3 bg-[#5F6FFF] rounded-[20px] text-white hover:bg-[#4A5BFF] mt-4"
            onClick={() => navigate('/signup')}
          >
            CREATE ACCOUNT
          </button>
        )}
      </div>

      {/* Create Account Button (Desktop) */}
      {!isLoggedIn && (
        <div className="hidden md:flex items-center">
          <button
            className="p-3 bg-[#5F6FFF] rounded-[20px] text-white hover:bg-[#4A5BFF]"
            onClick={() => navigate('/signup')}
          >
            CREATE ACCOUNT
          </button>
        </div>
      )}
    </div>
  );
};