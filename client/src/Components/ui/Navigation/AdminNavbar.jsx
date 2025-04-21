import React from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { Link } from 'react-router-dom';

export const AdminNav = () => {
  const { isAdmin, logout } = useAdmin(); 

  return (
    <div className="flex flex-row justify-between items-center p-4 border-b-2 border-gray-300 bg-white">
      <div className="flex flex-row items-center">
        <img src="/assets/HomePage/logo-prescripto.png" alt="Logo" className="w-24 md:w-32" />
        <span className="text-sm font-semibold text-end translate-y-3 -translate-x-2 hidden md:block">
          Admin
        </span>
      </div>

          <div className="flex flex-row justify-end items-center">
        {isAdmin ? (
          <button 
            onClick={logout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/admin/signin" 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};