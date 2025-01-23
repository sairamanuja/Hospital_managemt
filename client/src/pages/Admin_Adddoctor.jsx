import React from 'react'
import AdminNav from '../Components/ui/AdminNav'
import SideBar from '../Components/ui/SideBar'
import { useState } from 'react'
import { TextBox } from '../Components/ui/TextBox'

const Admin_Adddoctor = () => {
  const [doctorName, setDoctorName] = useState('')
  const [doctorEmail, setDoctorEmail] = useState('')
  const [doctorPhone, setDoctorPhone] = useState('')
  const [doctorSpecialization, setDoctorSpecialization] = useState('')
  const [doctorExperience, setDoctorExperience] = useState('')
  const [doctorQualification, setDoctorQualification] = useState('')
  const [doctorPassword, setDoctorPassword] = useState('')
  const [doctorAbout, setDoctorAbout] = useState('')
  const handleAddDoctor = () => {
    console.log(doctorName, doctorEmail, doctorPhone, doctorSpecialization, doctorExperience, doctorQualification, doctorPassword, doctorAbout)
  }
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
              <TextBox label="Doctor Name" placeholder="Enter Doctor Name" text={doctorName}  setText={setDoctorName} />
              <TextBox label="Doctor Email" placeholder="Enter Doctor Email" text={doctorEmail} setText={setDoctorEmail} />
              <TextBox label="Doctor Phone" placeholder="Enter Doctor Phone" text={doctorPhone} setText={setDoctorPhone} />
              <TextBox label="Doctor Specialization" placeholder="Enter Doctor Specialization" text={doctorSpecialization} setText={setDoctorSpecialization} />
              <TextBox label="Doctor Experience" placeholder="Enter Doctor Experience" text={doctorExperience} setText={setDoctorExperience} />
              <TextBox label="Doctor Qualification" placeholder="Enter Doctor Qualification" text={doctorQualification} setText={setDoctorQualification} />
              <TextBox label="Doctor Password" placeholder="Enter Doctor Password" text={doctorPassword} setText={setDoctorPassword} />
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