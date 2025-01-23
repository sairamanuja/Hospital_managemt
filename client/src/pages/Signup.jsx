import React, { useState } from 'react';
import { Navbar } from '../Components/Layout/home/Navbar';
import { TextBox } from '../Components/ui/TextBox';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password });
  };

  return (
    <div className="w-[80%] m-auto h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-[40px] rounded-md shadow-xl flex flex-col m-auto mt-10 w-[30%] h-[auto]">
          <h1 className="text-2xl font-bold pb-2">Create Account</h1>
          <p className="text-gray-500 pb-4">Please sign up to book an appointment</p>

          <form onSubmit={handleSubmit}>
          <TextBox
            label="Full Name"
            text={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

          <button
            className="bg-blue-500 text-white p-2 rounded-md mt-4"
            type="submit"
          >
            Create account
          </button>

          </form>
          <p className="mt-4 text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
