import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminLayout } from "../../Components/Layouts/AdminLayout"; // Import AdminLayout
import { API_ADMIN } from "../../Config/AdminApi";
import { Navigate, useNavigate } from "react-router-dom";
export const AllDoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      
      try {
        const response = await API_ADMIN.get("/admin/alldoctorAppointment");
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen w-[80%] m-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment, index) =>
                appointment.appointments.map((avail) =>
                  avail.slots.map((slot, slotIndex) => (
                    <tr key={`${index}-${slotIndex}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.doctorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {slot.patient ? slot.patient.name : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(avail.date).toLocaleDateString()} {slot.startTime} - {slot.endTime}
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};