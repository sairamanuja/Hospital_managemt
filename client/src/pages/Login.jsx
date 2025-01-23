import { useState } from 'react';
import { Navbar } from '../Components/Layout/home/Navbar';
import { TextBox } from '../Components/ui/TextBox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);   
    console.log('Password:', password);   };

  return (
    <div className="w-[80%] m-auto h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white p-[40px] rounded-md shadow-xl flex flex-col m-auto mt-10 w-[30%] h-[auto]">
          <h1 className="text-2xl font-bold pb-2">Login</h1>
          <p className="text-gray-500 pb-4">Please login to book an appointment</p>
          <form onSubmit={handleLogin}>
            <TextBox label="Email" type="email" text={email}  placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <TextBox label="Password" type="password" text={password}  placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
