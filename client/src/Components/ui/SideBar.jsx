import { useState } from 'react'
import { FaBars } from 'react-icons/fa';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`w-60 h-screen border-r-2 border-gray-300 p-5 fixed ${open ? 'left-0' : '-left-[232px]'} transition-all duration-300`}>
      {/* Toggle Button - Inside but stays visible */}
      <button 
        onClick={() => setOpen(!open)} 
        className=" fixed p-2 hover:bg-gray-200 rounded-md translate-x-[160px]"
      >
        <FaBars />
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