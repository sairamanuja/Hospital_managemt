import { useState } from 'react'
import { FaBars } from 'react-icons/fa';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`bg-white z-20 w-60 h-screen border-r-2 border-gray-300 p-5 fixed ${open ? 'left-0' : '-left-48'} transition-all duration-300`}>
      {/* Toggle Button - Positioned inside of and fixed the sidebar */}
      <button 
        onClick={() => setOpen(!open)} 
        className="absolute right-2 top-4 p-2 hover:bg-gray-200 rounded-md"
      >
        <FaBars className={`transition-all duration-300 ${open ? '' : 'rotate-180'}`} />
      </button>

      <div className="mt-12">
        <ul className="space-y-2">
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Dashboard</li>
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Appointments</li>
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Add Doctor</li>
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Doctors List</li>
          <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Patients</li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar