import { useState } from 'react';
import { TextBox } from '../../Components/UI/TextBox';
import { useNavigate } from 'react-router-dom';
import { API_ADMIN } from '../../Config/AdminApi';
import { AdminLayout } from '../../Components/Layouts/AdminLayout';

export const Add_Doctor = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [password, setPassword] = useState('');
  const [aboutme, setAboutme] = useState('');
  const [fees, setFees] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    
    const doctorData = {
      name,
      email,
      phone,
      speciality,
      experience,
      education,
      password,
      aboutme,
      fees,
      address
    };

    try {
      await API_ADMIN.post('/admin/addDoctor', doctorData);
      alert('Doctor added successfully');
      navigate('/admin/doctors');
    } catch (error) {
      console.error('Failed to add doctor:', error);
      alert('Failed to add doctor');
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 bg-blue-50 border-b">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Add New Doctor</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Fill in the doctor's details below</p>
          </div>
          
          <form onSubmit={handleAddDoctor} className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextBox
                  label="Full Name"
                  placeholder="Dr. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextBox
                  label="Email Address"
                  placeholder="doctor@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextBox
                  label="Phone Number"
                  placeholder="+1234567890"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <TextBox
                  label="Consultation Fees"
                  placeholder="500"
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  required
                />
                <TextBox
                  label="Education"
                  placeholder="MD, Cardiology"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                />
                <TextBox
                  label="Specialization"
                  placeholder="Cardiologist"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  required
                />
                <TextBox
                  label="Experience (Years)"
                  placeholder="10"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
                <TextBox
                  label="Password"
                  placeholder="Create a password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Clinic/Hospital address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Doctor</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief professional bio..."
                  value={aboutme}
                  onChange={(e) => setAboutme(e.target.value)}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/doctors')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Doctor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};