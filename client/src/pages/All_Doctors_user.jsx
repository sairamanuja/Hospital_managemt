import { useEffect, useState } from 'react';
import { Speciality } from '../Components/ui/Specality'; // Ensure correct import path
import { Navbar } from '../Components/Layout/home/Navbar';
import { API } from '../Components/config/Api';
import Doctor from '../Components/Layout/home/Doctor';

export const All_Doctors_user = () => {
  const [doctors, setDoctors] = useState([]);
  const [uniqueSpecialities, setUniqueSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log('Fetching doctor details...');
        const response = await API.get(`/user/allDoctors`);
        console.log('Doctor details:', response.data.doctors);

        // Check if doctors are returned
        if (response.data.doctors && response.data.doctors.length > 0) {
          console.log('Doctors fetched successfully');
        } else {
          console.log('No doctors found');
        }

        // Extract unique specialities
        const specialities = response.data.doctors
          .map((doctor) => doctor.speciality) // Extract speciality field
          .filter((speciality, index, self) => speciality && self.indexOf(speciality) === index); // Filter duplicates and empty values

        setUniqueSpecialities(specialities);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setError('Failed to fetch doctor details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Handle speciality click
  const handleSpecialityClick = (speciality) => {
    setSelectedSpeciality(speciality === selectedSpeciality ? '' : speciality); // Toggle selected speciality
  };

  // Filter doctors based on selected speciality
  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doctor) => doctor.speciality === selectedSpeciality)
    : doctors;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="w-[80%] m-auto h-screen">
        <Navbar />
        <div className="flex">
          <div className="w-[20%]">
            <h1 className="text-xl font-bold mb-4">Doctor Specialities</h1>
            {uniqueSpecialities.length > 0 ? (
              uniqueSpecialities.map((speciality, index) => (
                <Speciality
                  key={index}
                  text={speciality}
                  isSelected={speciality === selectedSpeciality} // Highlight selected speciality
                  onClick={() => handleSpecialityClick(speciality)} // Handle click
                />
              ))
            ) : (
              <p>No specialities available.</p>
            )}
          </div>
          <div className="w-[80%]">
            <div className="flex flex-wrap justify-center gap-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <Doctor
                    key={doctor._id} // Unique key for each doctor
                    doctorId={doctor._id}
                    image={doctor.image || 'https://via.placeholder.com/150'} // Default placeholder image
                    name={doctor.name || 'Doctor Name'}
                    speciality={doctor.speciality || 'Speciality'}
                  />
                ))
              ) : (
                <p>No doctors found for the selected speciality.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};