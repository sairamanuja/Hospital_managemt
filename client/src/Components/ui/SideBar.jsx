import React from 'react'

const SideBar = () => {
  return (
    <div className="w-60 h-screen border-r-2 border-gray-300 p-5 fixed">
    <ul className="space-y-2">
        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Dashboard</li>
        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Appointments</li>
        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Add Doctor</li>
        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Doctors List</li>
        <li className="cursor-pointer hover:bg-gray-300 p-2 rounded">Patients</li>
    </ul>
</div>
)
}

export default SideBar