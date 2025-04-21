import { useState } from 'react';

import { TextBox } from '../../Components/UI/TextBox';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../Components/Layouts/MainLayout';
export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://hospital-managemt.onrender.com/user/signup', {
        name,
        email,
        password,
        address,
        phone,
      });

      console.log(response.data);

      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
         <MainLayout>
         <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-xl w-full md:w-[30%] mt-10">
          <h1 className="text-2xl font-bold pb-2">Create Account</h1>
          <p className="text-gray-500 pb-4">Please sign up to book an appointment</p>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <TextBox
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              aria-label="Full Name"
            />

            <TextBox
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email"
            />

            <TextBox
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              aria-label="Password"
            />

            <TextBox
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              aria-label="Address"
            />

            <TextBox
              label="Phone"
              type="tel"
              value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" aria-label="Phone"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-4 text-gray-500 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
         </MainLayout>
      </>  
  );
};

