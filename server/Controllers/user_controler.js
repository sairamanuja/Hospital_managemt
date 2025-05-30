import { AppointmentModel_doctor } from "../Models/appointment_doctor.js";
import { AppointmentModel_user } from "../Models/appointment_user.js";
import { UserModel } from "../Models/user_model.js";
import { DoctorModel } from "../Models/doctor_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const signup =async (req,res)=>{
   
  const {email,password,name,address,phone}= req.body;
     if(!email||!password|| !name ||!address ||!phone ){
         return res.status(400).json({ message:"enter all the details"})
 
     }
     try{
           const user = await  UserModel.findOne({email})
           if(user){
             return res.status(401).json({message:"user exist"})
            }
           const hashedPassword = await bcrypt.hash(password,10);
 
           const newuser = await UserModel.create({
             email,
             password:hashedPassword,
             name,
             address,
             phone,
          
           })
           if(newuser){
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
            const user = await UserModel.findOne({ email });
            console.log(user)
         if (!user) {
             return res.status(404).json({ message: "user not found" });
         }
         const isPasswordCorrect = await bcrypt.compare(password, user.password);
         if (!isPasswordCorrect) {
             return res.status(401).json({ message: "invalid password" });
         }
         const JWT_SECRET = process.env.JWT_SECRET
         const token = jwt.sign({ id: user._id}, JWT_SECRET);
         if(token){
             return res.status(200).json({ message: "user logged in successfully", token });
         }
     } catch (error) {
         console.error(error)
         return res.status(500).json({ message: "Internal server error" });
     }
 }
 

export const GetAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    if (!patientId) {
        
      return res.status(400).json({ message: "patient id is required." });
    }


    const appointments = await AppointmentModel_user.find({ user: patientId }).populate('doctor');


    return res.status(200).json({
      message: "Appointments fetched successfully.",
      appointments,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const bookAppointment = async (req, res) => {
    try {
        const { date, startTime, endTime, doctorId } = req.body;
        const patientId = req.user.id;
        console.log("patient :" + patientId);

        if (!patientId || !date || !startTime || !endTime || !doctorId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Update the doctor's appointment slot and set the PatientId
        const updatedDoctorSlot = await AppointmentModel_doctor.findOneAndUpdate(
            {
                doctor: doctorId,
                "availability.date": date,
                "availability.slots.startTime": startTime,
                "availability.slots.endTime": endTime,
                "availability.slots.isBooked": false,
            },
            {
                $set: {
                    "availability.$.slots.$[slot].isBooked": true,
                    "availability.$.slots.$[slot].PatientId": patientId, // Add PatientId to the slot
                },
            },
            {
                arrayFilters: [{ "slot.startTime": startTime, "slot.endTime": endTime }],
                new: true,
            }
        );

        if (!updatedDoctorSlot) {
            return res.status(400).json({ message: "Slot not available or already booked" });
        }

        // Create user appointment
        const newUserAppointment = new AppointmentModel_user({
            user: patientId,
            doctor: doctorId,
            availability: [
                {
                    day: new Date(date).toLocaleString("en-us", { weekday: "long" }),
                    date: date,
                    slots: [
                        {
                            startTime,
                            endTime,
                            isBooked: true,
                        },
                    ],
                },
            ],
        });

        await newUserAppointment.save();

        return res.status(201).json({
            message: "Appointment booked successfully",
            appointment: newUserAppointment,
            success: true,
        });
    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({ message: "Failed to book appointment" });
    }
};

export const AllDoctor = async (req,res)=>{
   
    const doctors = await DoctorModel.find({  });
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

export const profile = async (req, res) => {
    const patientId = req.user.id;

    if (!patientId) {
        return res.status(400).json({ message: "Patient ID is required." });
    }

    try {
        const user = await UserModel.findById(patientId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}