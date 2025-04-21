import React, { useState } from 'react';
import { AdminNav } from '../../Components/UI/Navigation/AdminNavbar';
import { TextBox } from '../../Components/UI/TextBox';
import { API_ADMIN } from '../../Config/AdminApi';
import { Navigate } from 'react-router-dom';




export const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password,address,phone });
    try {
      const response = await API_ADMIN.post('/admin/signup', { name, email, password,address,phone });
      console.log(response.data);
      alert('Signup successful!');
      return <Navigate to="/admin/signin" />

    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="w-[100%] m-auto h-screen">
        <AdminNav />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-[40px] rounded-md shadow-xl flex flex-col m-auto mt-10 w-[30%] h-[auto]">
          <h1 className="text-2xl font-bold pb-2">Create Account</h1>
          <p className="text-gray-500 pb-4">Please sign up to book an appointment</p>

          <form onSubmit={handleSubmit}>
          <TextBox
            label="Full Name"
            text={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
          <TextBox
            label="Email"
            text={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <TextBox
            label="Password"
            text={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <TextBox
            label="Address"
            text={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
          <TextBox
            label="Phone"
            text={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />

          <button
            className="bg-blue-500 text-white p-2 rounded-md mt-4"
            type="submit"
          >
            Create account
          </button>

          </form>
          <p className="mt-4 text-gray-500">
            Already have an account?{' '}
            <a href="/admin/signin" className="text-blue-500">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};


