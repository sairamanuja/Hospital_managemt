import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-white z-20 w-60 h-screen border-r-2 border-gray-300 p-5 fixed md:relative ${
        open ? 'left-0' : '-left-48 md:left-0'
      } transition-all duration-300`}
    >      <button
        onClick={() => setOpen(!open)}
        className="absolute right-2 top-4 p-2 hover:bg-gray-200 rounded-md md:hidden"
      >
        <FaBars className={`transition-all duration-300 ${open ? '' : 'rotate-180'}`} />
      </button>

      <div className="mt-12">
        <ul className="space-y-2">
          
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">
            <Link to="/admin/allappointments">Appointments</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">
            <Link to="/admin/adddoctor">Add-Doctor</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">
            <Link to="/admin/alldoctors">Doctors List</Link>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

