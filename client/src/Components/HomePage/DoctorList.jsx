import  { useEffect, useState } from 'react';
import { API } from '../../Config/Api'; // Adjust the import based on your API service
import DoctorCard from '../UI/Doctor_card';

export const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await API.get('/user/allDoctors');
                setDoctors(response.data.doctors);
            } catch (error) {
                setError('Failed to fetch doctors. Please try again later.');
                console.error('Error fetching doctor details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="mt-14">
            <div className="p-4 pb-7">
                <h1 className="text-center text-2xl font-bold">Top Doctors to Book</h1>
                <p className="text-center text-sm pt-2">Simply browse through our extensive list of trusted doctors.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {doctors.map((doctor) => (
                    <DoctorCard
                        key={doctor._id}
                        doctorId={doctor._id}
                        image={doctor.image || '/assets/HomePage/General_physician.png'}
                        name={doctor.name || 'Doctor Name'}
                        speciality={doctor.speciality || 'Speciality'}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-[40px]">
                <button className="text-[#4B5563] bg-[#EAEFFF] px-4 w-[150px] py-2 rounded-3xl">More</button>
            </div>
        </div>
    );
};

