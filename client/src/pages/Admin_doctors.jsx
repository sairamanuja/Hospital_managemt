import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../Components/config/Api';
import AdminNav from '../Components/ui/AdminNav';
import SideBar from '../Components/ui/SideBar';
import Neurologist from "../Assets/HomePage/Neurologist.png"



const Admin_doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                console.log('Fetching doctors...');
                const response = await API.get('/admin/allDoctor');
                console.log('Response received:', response);
                
                if (response.data.doctors) {
                    setDoctors(response.data.doctors);
                } else {
                    setError(new Error('No doctors data found'));
                }
            } catch (error) {   
                console.error('Error fetching doctors:', error);
                setError(error);
                setDoctors([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDoctors();
    }, []);
        
    return (
        <div>
            <AdminNav />
            <div className="flex flex-row">
                <div className="w-[20%] h-screen">
                    <SideBar />
                </div>
                <div className="w-[80%] min-h-screen p-8 bg-gray-50">
                    <h2 className="text-2xl font-bold mb-6">Doctors List</h2>
                    {loading ? (
                        <p>Loading doctors...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error.message}</p>
                    ) : (
                        <div className="flex flex-row gap-4 flex-wrap">
                            {Array.isArray(doctors) && doctors.length > 0 ? (
                                doctors.map((doctor) => (
                                    <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img src={Neurologist} alt="Doctor" className="w-full h-48 object-cover"/>
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                                            <p className="text-gray-600 mb-1">{doctor.speciality}</p>
                                           
                                            <div className="mt-4">
                                                <Link 
                                                    to={`/admin/doctor/${doctor._id}`} 
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center">No doctors found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Admin_doctors;
/*     {Array.isArray(doctors) && doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.experience}</td>
                                <td>{doctor.education}</td>
                                <td>{doctor.fees}</td>
                                <td>{doctor.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No doctors found</td>
                        </tr>
                    )}*/ 