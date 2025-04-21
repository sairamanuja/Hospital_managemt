import React, { useEffect, useState } from 'react';
import { API } from '../../Config/Api';
import { MainLayout } from '../../Components/Layouts/MainLayout'; // Import MainLayout

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await API.get(`/user/getAppointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <MainLayout> {/* Wrap the content with MainLayout */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">My Appointments</h1>
        <div className="space-y-6">
          {appointments.map((appointment, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              {/* Dynamically map doctor details */}
              <h2 className="text-2xl font-semibold text-blue-800">
                Dr. {appointment.doctor?.name || "Unknown Doctor"}
              </h2>
              <p className="text-gray-600 text-lg">
                {appointment.doctor?.specialization || "General Physician"}
              </p>
              <p className="text-gray-500">
                Address: {appointment.doctor?.address || "57th Cross, Richmond Circle, Church Road, London"}
              </p>

              {/* Availability and slots */}
              <div className="mt-4 space-y-4">
                {appointment.availability.map((avail, availIndex) => (
                  <div key={availIndex} className="border-t pt-4">
                    <p className="text-gray-700 font-medium">Day: {avail.day}</p>
                    <p className="text-gray-600">Date: {new Date(avail.date).toLocaleDateString()}</p>
                    <div className="mt-2 space-y-2">
                      {avail.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-700">Slot: {slot.startTime} - {slot.endTime}</p>
                          <p className={`text-sm ${slot.isBooked ? 'text-green-600' : 'text-yellow-600'}`}>
                            Status: {slot.isBooked ? 'Booked' : 'Available'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cancel Appointment Button */}
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Appointments;