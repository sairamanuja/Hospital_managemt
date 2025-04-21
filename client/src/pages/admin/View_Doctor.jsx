import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_ADMIN } from "../../Config/AdminApi";
import { AdminLayout } from '../../Components/Layouts/AdminLayout';

export const View_doctor = () => {
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        console.log("Fetching doctor details...");
        const response = await API_ADMIN.get(`/admin/doctor/${id}`);
        console.log("Doctor details:", response.data);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctor();
  }, [id]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments and populate patient details
        const response2 = await API_ADMIN.get(`/admin/allAppointment/${id}?populate=PatientId`);
        setAppointments(response2.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [id, shouldRefresh]);

  const handleAddAppointment = async () => {
    console.log("Adding appointment...");
    try {
      const response = await API_ADMIN.post(`/admin/addAppointment`, {
        startTime: start_time,
        endTime: end_time,
        date: date,
        doctorId: id,
      });
      console.log("Appointment added successfully:", response.data);
      setShouldRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleDeleteSlot = async (appointmentId, slotId) => {
    try {
      await API_ADMIN.delete(`/admin/deleteSlot/${appointmentId}/${slotId}`);
      setShouldRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="w-[80%] h-screen pt-10">
        <h1 className="text-2xl font-bold pb-4">Doctor Details</h1>
        <div className="w-full h-full bg-[#f8f9fd] rounded-lg p-6">
          {doctor ? (
            <>
              <div className="flex flex-row">
                <img
                  src="/assets/HomePage/Neurologist.png"
                  alt="Doctor"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <p>Doctor Name: {doctor.name}</p>
              <p>Doctor Email: {doctor.email}</p>
              <p>Doctor Phone: {doctor.phone}</p>
              <p>Doctor Fees: {doctor.fees}</p>
              <p>Doctor Education: {doctor.education}</p>
              <p>Doctor Experience: {doctor.experience}</p>
              <p>Doctor Specialization: {doctor.speciality}</p>
              <p>Doctor About: {doctor.aboutme}</p>

              <div className="pt-10 flex flex-row">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleAddAppointment}
                >
                  Add Appointment
                </button>
                <input
                  type="time"
                  placeholder="start time"
                  className="border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="end time"
                  className="border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="date"
                  className="border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <h1 className="text-2xl font-bold pt-4">Doctor Appointments</h1>
              </div>

              <div className="mt-4">
                {appointments &&
                  appointments.map((appointment) => (
                    <div key={appointment._id} className="mb-6">
                      {appointment.availability.map(
                        (schedule) =>
                          schedule.slots &&
                          schedule.slots.length > 0 && (
                            <div key={schedule._id} className="mb-4">
                              <h3 className="text-xl font-semibold mb-2">
                                {schedule.day} - {schedule.date}
                              </h3>
                              <table className="min-w-full border">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Start Time</th>
                                    <th className="border p-2">End Time</th>
                                    <th className="border p-2">Patient Name</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {schedule.slots.map((slot) => (
                                    <tr key={slot._id}>
                                      <td className="border p-2">
                                        {schedule.date}
                                      </td>
                                      <td className="border p-2">
                                        {slot.startTime}
                                      </td>
                                      <td className="border p-2">
                                        {slot.endTime}
                                      </td>
                                      <td className="border p-2">
                                        {slot.isBooked && slot.PatientId
                                          ? slot.PatientId.name || "N/A"
                                          : "N/A"}
                                      </td>
                                      <td className="border p-2">
                                        {slot.isBooked ? "Booked" : "Available"}
                                      </td>
                                      <td className="text-center">
                                        <button
                                          onClick={() =>
                                            handleDeleteSlot(
                                              appointment._id,
                                              slot._id
                                            )
                                          }
                                          className="text-red-500 hover:text-red-700 font-bold"
                                        >
                                          X
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                      )}
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <p>Loading doctor details...</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};