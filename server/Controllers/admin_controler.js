import {AdminModel} from "../Models/admin_model.js"
import { DoctorModel } from "../Models/doctor_model.js";
import{AppointmentModel_doctor} from "../Models/appointment_doctor.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const signup =async (req,res)=>{
   
 const {email,password,name,address,phone}= req.body;
    if(!email||!password|| !name ||!address ||!phone){
        return res.status(400).json({ message:"enter all the details"})

    }
   
    try{
          const admin = await  AdminModel.findOne({email})
          if(admin){
            return res.status(401).json({message:"user exist"})
          }
          const hashedPassword = await bcrypt.hash(password,10);

          const newadmin = await AdminModel.create({
            email,
            password:hashedPassword,
            name,
            address,
            phone,
           
          })
          if(newadmin){
            return res.status(200).json({message:"signup done sucessfully"})
          }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"internal server error "})
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "enter email and password" });
    }
    try {
                const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "invalid password" });
        }
        const JWT_SECRET = "manish12"
        const token = jwt.sign({ id: admin._id}, JWT_SECRET);
        if(token){
            return res.status(200).json({ message: "admin logged in successfully", token });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const AddDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            experience,
            fees,
            speciality,
            education,
            address,
            aboutme,
            phone
        } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Check if doctor already exists
        const existingDoctor = await DoctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                message: "Doctor with this email already exists"
            });
        }

        const adminId = req.admin.id;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);

        const Doctor = await DoctorModel.create({
            name,
            password: hashedPassword,
            email,
            experience,
            fees,
            aboutme,
            speciality,
            education,
            address,
            phone,
            updatedBy: adminId
        });

        return res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            doctor: {
                name: Doctor.name,
                email: Doctor.email,
                speciality: Doctor.speciality
            }
        });

    } catch (error) {
        console.error('AddDoctor Error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const AllDoctor = async (req,res)=>{
   
    const doctors = await DoctorModel.find({  });
    res.status(200).json({ doctors });
    
}
export const DoctorBySpeciality = async (req,res)=>{
    const speciality = req.body.speciality;
    const doctors = await DoctorModel.find({ speciality: speciality });
    res.status(200).json({ doctors });
}

export const Doctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await DoctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







export const EditDoctor = async (req, res) => {
    const { name, email, password, experience, fees, speciality, education, address, aboutme } = req.body;
    const { doctorId } = req.body;
    const hospitalId = req.hospital.id;
    const adminId = req.admin.id;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const doctor = await DoctorModel.updateOne(
            { _id: doctorId, adminId }, 
            { 
                $set: { 
                    name, 
                    password: hashedPassword, 
                    email,
                    hospital:hospitalId,
                    experience, 
                    fees, 
                    aboutme, 
                    speciality, 
                    education, 
                    address,
                    updatedBy:adminId

                } 
            }
        );

        if (doctor) { 
            return res.status(200).json({ message: "Doctor details updated successfully" });
        } 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const createAppointmentByDoctor = async (req, res) => {
    try {
        const { doctorId, date, startTime, endTime } = req.body;
        const adminId = req.admin.id;

        // Validate date format
        const appointmentDate = new Date(date);
        if (isNaN(appointmentDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const doctor = await DoctorModel.findOne({ _id: doctorId });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Format date to YYYY-MM-DD for consistent comparison
        const formattedDate = appointmentDate.toISOString().split('T')[0];
        const dayOfWeek = appointmentDate.toLocaleString("en-us", { weekday: "long" });

        let appointment = await AppointmentModel_doctor.findOne({
            doctor: doctorId,
            "availability.date": formattedDate  // Changed from day to date
        });

        if (!appointment) {
            appointment = new AppointmentModel_doctor({
                doctor: doctorId,
                availability: [{
                    day: dayOfWeek,
                    date: formattedDate,  // Added date field
                    slots: [{
                        startTime,
                        endTime,
                        isBooked: false,
                    }],
                }],
            });
            await appointment.save();
            
            return res.status(201).json({
                message: "Appointment slot created successfully",
                appointment,
            });
        }

        const dayAvailability = appointment.availability.find(a => a.date === formattedDate);  // Changed from day to date
        
        if (!dayAvailability) {
            appointment.availability.push({
                day: dayOfWeek,
                date: formattedDate,  // Added date field
                slots: [{
                    startTime,
                    endTime,
                    isBooked: false,
                }],
            });
            await appointment.save();
            
            return res.status(201).json({
                message: "New day slot created successfully",
                appointment,
            });
        }

        const newStart = convertTimeToMinutes(startTime);
        const newEnd = convertTimeToMinutes(endTime);
        
        let hasOverlap = false;

        for (let i = 0; i < dayAvailability.slots.length; i++) {
            const existingSlot = dayAvailability.slots[i];
            const existingStart = convertTimeToMinutes(existingSlot.startTime);
            const existingEnd = convertTimeToMinutes(existingSlot.endTime);

            if ((newStart >= existingStart && newStart < existingEnd) ||
                (newEnd > existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)) {
                hasOverlap = true;
                break;  
            }
        }

        if (hasOverlap) {
            return res.status(400).json({ 
                message: "This time slot overlaps with an existing appointment" 
            });
        }

        // Add the new slot if no overlap
        dayAvailability.slots.push({
            startTime,
            endTime,
            isBooked: false,
        });

        await appointment.save();

        return res.status(201).json({
            message: "New appointment slot added successfully",
            appointment,
        });
        
    } catch (error) {
        console.error("Error creating appointment:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

// Helper function to convert time string to minutes
function convertTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}





  
export const getAllAppointments = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id",id)
        const appointments = await AppointmentModel_doctor.find({doctor:id});   
        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const deleteAppointmentSlot = async (req, res) => {
    try {
        const { appointmentId, slotId } = req.params;
        
        const appointment = await AppointmentModel_doctor.findOneAndUpdate(
            { _id: appointmentId },
            {
                $pull: {
                    "availability.$[].slots": {
                        _id: slotId,
                        isBooked: false  // Only allow deletion of unbooked slots
                    }
                }
            },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ 
                message: "Appointment slot not found or is already booked" 
            });
        }

        return res.status(200).json({
            message: "Appointment slot deleted successfully",
            appointment
        });

    } catch (error) {
        console.error("Error deleting appointment slot:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
