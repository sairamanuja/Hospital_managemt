import {useEffect,useState} from 'react'
import { MainLayout } from '../../Components/Layouts/MainLayout'
import { API } from '../../Config/Api';


export const Profile = () => {
  
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await API.get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User data:', response.data);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUser();
    }, []);
  
    if (!user) {
      return <p>Loading...</p>;
    }
  
    return (
    <>
    <MainLayout>
    <div className="pt-4">
          <img
            src="../Assets/profile/profile_pic.png"
            alt="Profile"
            className="w-[10%] h-[10%] rounded-full"
          />
          <h1 className="border-b-2 border-gray-300 pt-4 pb-1 text-2xl font-bold w-[50%]">
            {user.name}
          </h1>
          <p className="text-gray-500 underline-offset-4 underline pt-4">CONTACT INFORMATION</p>
          <p className="pt-2">Email: {user.email}</p>
          <p className="pt-2">Phone: {user.phone}</p>
          <p className="pt-2">Address: {user.address}</p>
          <p className="text-gray-500 underline-offset-4 underline pt-4">BASIC INFORMATION</p>
          <p className="pt-2">Gender: Male</p> 
          <p className="pt-2">Date of Birth: 12/12/1990</p> 
          <div className="flex flex-row gap-4">
            <button className="bg-blue-500 text-white p-2 rounded-md mt-4">Edit</button>
            <button className="bg-blue-500 text-white p-2 rounded-md mt-4">Save Information</button>
          </div>
        </div>
    </MainLayout>
    </>
  )
}


