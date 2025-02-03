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
function App() {
  

  return (
    <>
        <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route path="/admin_adddoctor" element={<Admin_Adddoctor/>}/>
      <Route path="/adminsignup" element={<AdminSignup/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/sidebar2" element={<Sidebar/>}/>

      
     </Routes>   
     </BrowserRouter>
     </>
     
    
    )
}

export default App
