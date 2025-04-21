import { useEffect, useState } from 'react';
import { MainLayout } from '../../Components/Layouts/MainLayout';
import { API } from '../../Config/Api';
import { Speciality } from '../../Components/UI/Specality';
import  DoctorCard  from '../../Components/UI/Doctor_card'; // Ensure this component is imported

export const AllDoctors_user = () => {
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

        if (response.data.doctors ) {
          console.log('Doctors fetched successfully');
        } else {
          console.log('No doctors found');
        }

        const specialities = response.data.doctors
          .map((doctor) => doctor.speciality) .filter((speciality, index, self) => speciality && self.indexOf(speciality) === index); // Filter duplicates and empty values

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
    <MainLayout>
      <div className="flex flex-col md:flex-row items-center justify-center p-4">
        <div className="w-full  md:w-[20%] mb-6 md:mb-0">
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

        <div className="w-full md:w-[80%]">
          <div className="flex flex-wrap justify-center gap-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id} // Unique key for each doctor
                  doctorId={doctor._id}
                  image={doctor.image || '/assets/HomePage/General_physician.png'} // Default placeholder image
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
    </MainLayout>
  );
};