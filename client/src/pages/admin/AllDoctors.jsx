import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ADMIN } from '../../Config/AdminApi';
import { AdminLayout } from '../../Components/Layouts/AdminLayout';

export const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                console.log('Fetching doctors...');
                const response = await API_ADMIN.get('/admin/allDoctor');
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
        <AdminLayout>
            {loading ? (
                <p>Loading doctors...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : (
                <div className="flex flex-row gap-4 flex-wrap">
                    {Array.isArray(doctors) && doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[48%] md:w-[31%] lg:w-[23%]">
                                <img src="/assets/HomePage/Neurologist.png" alt="Doctor" className="w-full h-48 object-cover"/>
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
        </AdminLayout>
    );
};

