import AdminNav from '../Components/ui/AdminNav'
import { useState, useEffect } from 'react'
import { TextBox } from '../Components/ui/TextBox'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import Sidebar from '../Components/ui/Sidebar2'
import SideBar from '../Components/ui/SideBar'

const Admin_Adddoctor = () => {
  const [doctorName, setDoctorName] = useState('')
  const [doctorEmail, setDoctorEmail] = useState('')
  const [doctorPhone, setDoctorPhone] = useState('')

  const [doctorSpecialization, setDoctorSpecialization] = useState('')
  const [doctorExperience, setDoctorExperience] = useState('')
  const [doctorQualification, setDoctorQualification] = useState('')
  const [doctorPassword, setDoctorPassword] = useState('')
  const [doctorAbout, setDoctorAbout] = useState('')
  const [doctorFees, setDoctorFees] = useState('')
  const [doctorEductaion, setDoctorEducation] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {

      navigate('/adminlogin')
    } else {  
      console.log('Token:', token)}
  }, [])
  const handleAddDoctor = (e) => {
    e.preventDefault();
    
    // Create the data object with matching field names
    const doctorData = {
        name: doctorName,
        email: doctorEmail,
        phone: doctorPhone,
        speciality: doctorSpecialization,
        experience: doctorExperience,
        education: doctorQualification,
        password: doctorPassword,
        aboutme: doctorAbout,
        fees: doctorFees,
        address: address
    };

    axios.post('http://localhost:3000/admin/addDoctor', 
        doctorData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
    .then(response => {
        console.log(response.data);
        // Show success message
        alert("Doctor added successfully!");
        // Optionally redirect
        navigate('/admin/doctors');
    })
    .catch(error => {
        console.error('Failed to add doctor:', error.response?.data || error);
        alert(error.response?.data?.message || "Failed to add doctor");
    });
};
  return (

    <>
      <AdminNav />
      <div className="flex flex-row">
        <div className="w-[20%] h-screen">
          <SideBar />
        </div>
        <div className="w-[70%] h-screen pt-10">
          <h1 className='text-2xl font-bold pb-4'>Add Doctor</h1>
          <div className="w-full h-full bg-[#f8f9fd] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Upload Doctor Picture</h2>
            <form className="space-y-4 ">
              <TextBox label="Doctor Name" placeholder="Enter Doctor Name" text={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
              <TextBox label="Doctor Email" placeholder="Enter Doctor Email" text={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} />
              <TextBox label="Doctor Phone" placeholder="Enter Doctor Phone" text={doctorPhone} onChange={(e) => setDoctorPhone(e.target.value)} />
              <TextBox label="Doctor Fees" placeholder="Enter Doctor Fess" text={doctorFees} onChange={(e) => setDoctorFees(e.target.value)} />
              <TextBox label="Doctor Education" placeholder="Enter Doctor Education" text={doctorEductaion} onChange={(e) => setDoctorEducation(e.target.value)} />
              <TextBox label="Doctor Address" placeholder="Enter Doctor Address" text={address} onChange={(e) => setAddress(e.target.value)} />                
              <TextBox label="Doctor Specialization" placeholder="Enter Doctor Specialization" text={doctorSpecialization} onChange={(e) => setDoctorSpecialization(e.target.value)} />
              <TextBox label="Doctor Experience" placeholder="Enter Doctor Experience" text={doctorExperience} onChange={(e) => setDoctorExperience(e.target.value)} />
              <TextBox label="Doctor Qualification" placeholder="Enter Doctor Qualification" text={doctorQualification} onChange={(e) => setDoctorQualification(e.target.value)} />
              <TextBox label="Doctor Password" placeholder="Enter Doctor Password" text={doctorPassword} onChange={(e) => setDoctorPassword(e.target.value)} />
              <label >
                About Doctor
              </label>
             <textarea name="" id="" value={doctorAbout} onChange={(e) => setDoctorAbout(e.target.value)} className='w-full h-20 border-2 border-gray-300 rounded-md p-2'></textarea>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4' onClick={handleAddDoctor}>Add Doctor</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin_Adddoctor