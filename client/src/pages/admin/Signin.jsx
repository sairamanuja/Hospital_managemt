import { useState } from 'react';
import { AdminNav } from '../../Components/UI/Navigation/AdminNavbar';
import { TextBox } from '../../Components/UI/TextBox';
import { Link, useNavigate } from 'react-router-dom';
import { API_ADMIN } from '../../Config/AdminApi';
import { useAdmin } from '../../context/AdminContext';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAdmin(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API_ADMIN.post('/admin/login', { email, password });
      const { token } = response.data;
      
      if (!token) {
        console.log('Login failed: No token received');
        return;
      }

      login(token); // Use context login instead of direct localStorage
      navigate('/admin/adddoctor');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="w-[100%] m-auto h-screen">
      <AdminNav />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-[40px] rounded-md shadow-xl flex flex-col m-auto mt-10 w-[30%] h-[auto]">
          <h1 className="text-2xl font-bold pb-2">Login</h1>
          <p className="text-gray-500 pb-4">Please login to book an appointment</p>
          <form onSubmit={handleLogin}>
            <TextBox 
              label="Email" 
              type="email" 
              text={email}  
              placeholder="Enter your email" 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <TextBox 
              label="Password" 
              type="password" 
              text={password}  
              placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
            >
              Login
            </button>
            <p className="text-gray-500 pb-4">
              Don't have an account? <Link to="/admin/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};