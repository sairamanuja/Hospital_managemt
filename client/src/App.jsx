import React from 'react'
import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'
import Aboutus from './pages/Aboutus'
import Admin_Adddoctor from './pages/Admin_Adddoctor'
import {  AdminSignup } from './pages/AdminSignup'
import AdminLogin  from './pages/AdminLogin'
import Sidebar from './Components/ui/Sidebar2'
import axios from 'axios'
import { ProtectedRoute} from './Components/config/config'
import Admin_doctors from './pages/Admin_doctors'
import {Admin_doctor_view} from './pages/Admin_doctor_view'
import { View_Doctor_user } from './pages/View_Doctor_user'
import { All_Doctors_user } from './pages/All_Doctors_user'
function App() {
  

  return (
    <>
        <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/doctor/:id" element={<View_Doctor_user/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/adddoctor" element={<Admin_Adddoctor />} />
        <Route path="/admin/doctors" element={<Admin_doctors />} />
        <Route path="/admin/doctor/:id" element={<Admin_doctor_view />} />
      </Route>
     
      <Route path="/adminsignup" element={<AdminSignup/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/sidebar2" element={<Sidebar/>}/>
      <Route path="/alldoctors" element={<All_Doctors_user/>}/>


      
     </Routes>   
     </BrowserRouter>
     </>
     
    
    )
}

export default App
