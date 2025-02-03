import { useState } from 'react'
import { FaBars, FaTachometerAlt, FaCalendarCheck, FaUserMd, FaList, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { title: "Appointments", icon: <FaCalendarCheck />, path: "/admin/appointments" },
    { title: "Add Doctor", icon: <FaUserMd />, path: "/admin/add-doctor" },
    { title: "Doctors List", icon: <FaList />, path: "/admin/doctors" },
    { title: "Patients", icon: <FaUsers />, path: "/admin/patients" },
  ];

  return (
    <div className={`bg-white h-screen border-r-2 border-gray-300 p-5 pt-8 fixed ${open ? 'w-60' : 'w-20'} transition-all duration-300`}>
      <button 
        onClick={() => setOpen(!open)} 
        className={`absolute top-5 ${open ? 'right-4' : 'right-[-12px]'} p-2 hover:bg-gray-200 rounded-full`}
      >
        <FaBars />
      </button>

      <div className="mt-12">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className="flex items-center gap-x-4 cursor-pointer hover:bg-gray-100 rounded-md p-2 text-gray-700">
                <span className="text-xl">{item.icon}</span>
                <span className={`${!open && 'hidden'} origin-left duration-200`}>
                  {item.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
