import React from 'react'
import AdminNav from '../Components/ui/AdminNav'
import SideBar from '../Components/ui/SideBar'
const Admin_Adddoctor = () => {
  return (
    <>
    <AdminNav/>
    <div className="flex flex-row">
    <div className="w-[20%] h-screen">
        <SideBar/>
    </div>
    <div className="w-[80%] h-screen">
        <div className="w-[100%] h-[80%] bg-[f8f9fd] rounded-lg"></div>
    </div>
        
    </div>

    
    </>
  )
}

export default Admin_Adddoctor