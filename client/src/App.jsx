import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/user/Home';
import {ProtectedRoute} from './Config/ProtectedRoutes';
import {Login} from './pages/user/Login';
import {Signup} from './pages/user/Signup';
import { ContactUs } from './pages/user/ContactUs';
import { AboutUs } from './pages/user/AboutUs';
import { AllDoctors_user } from './pages/user/AllDoctors_user';
import { Profile } from './pages/user/Profile';
import { Add_Appointment } from './pages/user/Add_Appointment';
import { AllDoctors } from './pages/admin/AllDoctors';
import { AdminLogin } from './pages/admin/Signin';
import {AdminSignup} from './pages/admin/Signup'
import { Add_Doctor } from './pages/admin/Add_Doctor';
import { AllDoctorAppointments } from './pages/admin/Dashboard';
import { View_doctor } from './pages/admin/View_Doctor';
import Appointments from './pages/user/MyAppointments';
const App = () => {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allDoctors" element={<AllDoctors_user />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/alldoctors" element={<AllDoctors />} />
          <Route path="/admin/signin" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/addDoctor" element={<Add_Doctor />} />
          <Route path="/admin/allappointments" element={<AllDoctorAppointments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/admin/doctor/:id" element={<View_doctor />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/doctor/:id" element={<Add_Appointment />} />
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
};

export default App;
