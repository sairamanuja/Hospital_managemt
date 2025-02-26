import Doctor from './Doctor'
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../../config/Api'

export const Doctor_component = () => {

    const navigate = useNavigate();

   const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const fetchDoctors = async () => {   
            try {
                console.log('Fetching doctor details...');
                const response = await API.get(`/user/allDoctors`);
                console.log('Doctor details:', response.data.doctors);
                response.data.doctors.forEach(doctor => {
                    console.log('Doctor ID:', doctor._id);
                });
                setDoctors(response.data.doctors);
                console.log('Doctors fetched successfully');
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        }
        fetchDoctors();
    }, []);

    // Log doctors to verify the state
    useEffect(() => {
        console.log(doctors);
    }, [doctors]); // This will log doctors whenever it changes

  return (
    <div className='mt-14'>
        <div className=" p-4 pb-7">
            <h1 className='text-center text-2xl font-bold'>Top Doctors to Book</h1>
            <p className='text-center text-sm pt-2'>Simply browse through our extensive list of trusted doctors.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
            {doctors && doctors.map((doctor) => (
                
                <Doctor 
                    doctorId={doctor._id}
                    image={doctor.image || '/src/Assets/HomePage/General_physician.png'}
                    name={doctor.name || 'Doctor Name'}
                    speciality={doctor.speciality || 'Speciality'}
              
                />
            ))}
        </div>

        <div className="flex justify-center mt-[40px]">
            <button className='text-[#4B5563] bg-[#EAEFFF] px-4 w-[150px] py-2 rounded-3xl '>more</button>
        </div>
       
       
       
    </div>
   
  )
}

export const Content_2 = () => {
    const navigate = useNavigate()
    return(
   <div className="mt-[100px]">
     <div className="flex flex-row  bg-[#5F6FFF] h-[250px] w-[100%] rounded-lg m-auto">
        <div className="w-[65%] flex flex-col justify-center  pl-10">
            <h1 className='text-white text-2xl font-bold mb-4'>Book an Appointment</h1>
            <h1 className='text-white text-2xl mb-4'>Book Appointment 
            With 100+ Trusted Doctors</h1>
            <button className='bg-white text-black px-4 py-2 rounded-3xl mt-4 w-[160px]' onClick={()=>{navigate('/signup')}}>Create account</button>
        </div>
        <div className="w-[30%] flex justify-center items-center -translate-y-7">
            <img src="/src/Assets/HomePage/appointment-doc-img.png " alt="" />
        </div>
       </div>
   </div>
    )
}   


export const Footer = () => {
    return(
        <div className=" mt-[50px] " >
        <div className=" mx-auto flex justify-between items-start w-[100%]">
            <div className="w-[30%]">
                <img className='w-[40%]' src="/src/Assets/HomePage/logo-prescripto.png" alt="" />
                <p className="text-gray-600 pt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
            </div>
            <div className="">
                <h2 className="text-lg font-semibold">COMPANY</h2>
                <ul className="text-gray-600 pt-4">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="">
                <h2 className="text-lg font-semibold">GET IN TOUCH</h2>
                <p className="text-gray-600 pt-4">+1-212-456-7890</p>
                <p className="text-gray-600 pt-4">greatstackdev@gmail.com</p>
            </div>
        </div>
        <div className=" border-t-2 border-[#ADADAD] mt-[25px] "> 
            <p className="text-gray-600 pt-4 text-center">@ 2024 Prescripto. All rights reserved.</p>
        </div>
      </div>

    )
}
