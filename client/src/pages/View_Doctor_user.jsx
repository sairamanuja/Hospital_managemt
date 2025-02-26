import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../Components/config/Api';
import { Navbar } from '../Components/Layout/home/Navbar';
import { DayCard } from '../Components/Layout/home/Days'; // Import DayCard
import { TimeSlot } from '../Components/Layout/home/Days'; // Import TimeSlot
import { Button } from '../Components/ui/Button';

export const View_Doctor_user = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null); // Track selected slot

  const { id } = useParams();

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await API.get(`/user/doctor/${id}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctor();
  }, [id]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response2 = await API.get(`/user/allAppointment/${id}`);
        const transformedAppointments = transformAppointments(response2.data.appointments);
        setAppointments(transformedAppointments);
        console.log(transformedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [id]);

  // Function to transform the appointments data
  const transformAppointments = (appointments) => {
    if (!appointments) return [];

    // Group slots by day and date
    const groupedAppointments = {};

    appointments.forEach((appointment) => {
      appointment.availability.forEach((schedule) => {
        const key = `${schedule.day}-${schedule.date}`; // Unique key for each day and date
        if (!groupedAppointments[key]) {
          groupedAppointments[key] = {
            day: schedule.day,
            date: schedule.date,
            slots: [],
          };
        }
        schedule.slots.forEach((slot) => {
          groupedAppointments[key].slots.push({
            startTime: slot.startTime,
            endTime: slot.endTime,
            isBooked: slot.isBooked,
            slotId: slot._id,
            appointmentId: appointment._id,
          });
        });
      });
    });

    // Convert the grouped object into an array
    return Object.values(groupedAppointments);
  };

  // Function to handle day card click
  const handleDayClick = (day) => {
    setSelectedDay(day === selectedDay ? null : day); // Toggle selected day
  };

  // Function to handle booking appointment
  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    // Check if the selected slot is already booked
    const isSlotBooked = appointments.some((appointment) =>
      appointment.slots.some((slot) => slot.slotId === selectedSlot.slotId && slot.isBooked)
    );

    if (isSlotBooked) {
      alert('This slot is already booked. Please select another slot.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      const response = await API.post(
        '/user/addAppointment',
        {
          doctorId: id,
          date: selectedSlot.date,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
        }
      );

      if (response.data.success) {
        alert('Appointment booked successfully!');
        // Update the UI to reflect the booked slot
        const updatedAppointments = appointments.map((appointment) => {
          return {
            ...appointment,
            slots: appointment.slots.map((slot) =>
              slot.slotId === selectedSlot.slotId ? { ...slot, isBooked: true } : slot
            ),
          };
        });
        setAppointments(updatedAppointments);
        setSelectedSlot(null); // Clear selected slot
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-[80%] m-auto h-screen">
      <Navbar />
      <div className="flex flex-row h-[40%]">
        <div className="border-2 border-gray-300 rounded-md p-4 mr-4 flex justify-center items-center w-[20%]">
          <img src="/src/Assets/HomePage/Dermatologist.png" alt="" />
        </div>
        <div className="border-2 border-gray-300 pt-4 w-full rounded-md p-3">
          {doctor ? (
            <>
              <h1 className="text-2xl font-semibold">{doctor.name}</h1>
              <p className="text-[12px] py-2">{doctor.education}</p>
              <p className="py-2">About</p>
              <p className="text-[12px]">{doctor.aboutme}</p>
            </>
          ) : (
            <p>Loading doctor details...</p>
          )}
        </div>
      </div>
      <div className="pt-4 w-[60%] m-auto">
        <p className="py-2 pb-4 font-semibold">Booking slots</p>
        <div className="flex flex-wrap gap-3">
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <DayCard
                key={index}
                day={appointment.day}
                date={appointment.date}
                isSelected={appointment.day === selectedDay} // Highlight selected day
                onClick={() => handleDayClick(appointment.day)} // Handle click
              />
            ))
          ) : (
            <p>No appointments available.</p>
          )}
        </div>
        <div className="mt-4 mb-4">
          {selectedDay ? (
            appointments
              .filter((appointment) => appointment.day === selectedDay)
              .map((appointment, index) => (
                <div key={index}>
                  <div className="flex gap-3">
                    {appointment.slots.map((slot, slotIndex) => (
                      <TimeSlot
                        key={`${index}-${slotIndex}`}
                        starttime={slot.startTime}
                        endtime={slot.endTime}
                        isSelected={selectedSlot?.slotId === slot.slotId}
                        isBooked={slot.isBooked} // Pass isBooked prop
                        onClick={() => {
                          if (!slot.isBooked) {
                            setSelectedSlot({
                              slotId: slot.slotId,
                              startTime: slot.startTime,
                              endTime: slot.endTime,
                              date: appointment.date,
                            });
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <p>No day selected. Click on a day to view slots.</p>
          )}
        </div>
        <Button text="Book Appointment" onClick={handleBookAppointment} />
      </div>
    </div>
    
  );
};