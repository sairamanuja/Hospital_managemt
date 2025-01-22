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
    const hospitalId = req.hospital.id;
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
            hospital:hospitalId
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
    const hospitalId = req.hospital.id;
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
        const token = jwt.sign({ id: admin._id,hospital:hospitalId }, JWT_SECRET);
        if(token){
            return res.status(200).json({ message: "admin logged in successfully", token });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const AddDoctor = async (req,res)=>{

    const {name,email,password,experience,fees,speciality,education,address,aboutme,phone}= req.body
     const adminId = req.admin.id;
     const hospitalId = req.hospital.id;
     console.log(adminId)
    try{
        
        const hashedPassword = await bcrypt.hash(password,10); 
        const Doctor = await DoctorModel.create({
            name,
          
            password:hashedPassword,
            email,
            hospital:hospitalId,
            experience,
            fees,
            aboutme,
            speciality,
            education,
            address,
            phone,
            updatedBy:adminId
        })
        if(Doctor){
            return res.status(200).json({message:"doctor created sucessfully"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:"internal server error"})

    }
}

export const AllDoctor = async (req,res)=>{
    const hospitalId = req.hospital.id;


   
    const doctors = await DoctorModel.find({  hospital: hospitalId });
    res.status(200).json({ doctors });
    
}

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
        const hospitalId = req.hospital.id;
        const adminId = req.admin.id;

        const doctor = await DoctorModel.findOne({ _id: doctorId });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const dayOfWeek = new Date(date).toLocaleString("en-us", { weekday: "long" });

        let appointment = await AppointmentModel_doctor.findOne({
            doctor: doctorId,
            hospital: hospitalId,
            "availability.day": dayOfWeek,
        });

        if (!appointment) {
            appointment = new AppointmentModel_doctor({
                doctor: doctorId,
                hospital: hospitalId,
                availability: [{
                    day: dayOfWeek,
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

        const dayAvailability = appointment.availability.find(a => a.day === dayOfWeek);
        
        if (!dayAvailability) {
            appointment.availability.push({
                day: dayOfWeek,
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
        const hospitalId = req.hospital.id;
        const appointments = await AppointmentModel_doctor.find({ hospital: hospitalId })
        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const deleteAppointmentSlot = async (req, res) => {
    try {
        const { doctorId, date, startTime, endTime } = req.body;
        const hospitalId = req.hospital.id;
       //const adminId = req.admin.id;

        const dayOfWeek = new Date(date).toLocaleString("en-us", { weekday: "long" });

        const appointment = await AppointmentModel_doctor.findOneAndUpdate(
            {
                doctor: doctorId,
                hospital: hospitalId,
                "availability.day": dayOfWeek,
                "availability.slots": {
                    $elemMatch: {
                        startTime: startTime,
                        endTime: endTime,
                        isBooked: false  // Only allow deletion of unbooked slots
                    }
                }
            },
            {
                $pull: {
                    "availability.$.slots": {
                        startTime: startTime,
                        endTime: endTime
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
