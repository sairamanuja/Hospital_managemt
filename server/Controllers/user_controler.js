import { AppointmentModel_doctor } from "../Models/appointment_doctor.js";
import { AppointmentModel_user } from "../Models/appointment_user.js";
import { UserModel } from "../Models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup =async (req,res)=>{
   
  const {email,password,name,address,phone,gender}= req.body;
     if(!email||!password|| !name ||!address ||!phone ||!gender){
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
             gender
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
     const hospitalId = req.hospital.id;
     if (!email || !password) {
         return res.status(400).json({ message: "enter email and password" });
     }
     try {
            const user = await UserModel.findOne({ email });
         if (!user) {
             return res.status(404).json({ message: "user not found" });
         }
         const isPasswordCorrect = await bcrypt.compare(password, user.password);
         if (!isPasswordCorrect) {
             return res.status(401).json({ message: "invalid password" });
         }
         const JWT_SECRET = "manish12"
         const token = jwt.sign({ id: user._id,hospital:hospitalId}, JWT_SECRET);
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
    const hospitalId = req.hospital.id;

    if (!patientId) {
      return res.status(400).json({ message: "patient id is required." });
    }


    const appointments = await AppointmentModel_user.find({
       
        hospital: hospitalId,
        user: patientId,
    });


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
        const hospitalId = req.hospital.id;
        console.log("Hospital ID:", hospitalId);
        
        if (!patientId || !date || !startTime || !endTime || !doctorId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const dayOfWeek = new Date(date).toLocaleString("en-us", { weekday: "long" });

     
        const bookSlot = await AppointmentModel_doctor.findOneAndUpdate(
            {
                doctor: doctorId,
                hospital: hospitalId,
                "availability.day": dayOfWeek,
                "availability.slots.startTime": startTime,
                "availability.slots.endTime": endTime,
            },
            {
                $set: {
                    "availability.$.slots.$[slot].isBooked": true // Use positional operator for nested slots
                }
            },
            {
                arrayFilters: [{ "slot.startTime": startTime, "slot.endTime": endTime }], // Filter for the specific slot
               
            }
        );

        // Log the result of the update
        console.log("Updated Slot:", bookSlot);

        if (!bookSlot) {
            return res.status(404).json({ message: "No matching slot found to update." });
        }

        const newAppointment = new AppointmentModel_user({
            doctor: doctorId,
            hospital: hospitalId,
            user: patientId,
            availability: [
                {
                    day: dayOfWeek,
                    slots: [
                        {
                            startTime: startTime,
                            endTime: endTime,
                            isBooked: true,
                        },
                    ],
                },
            ],
        });

        await newAppointment.save();

        return res.status(201).json({
            message: "Appointment booked successfully.",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error booking appointment:", error); // Log the error
        return res.status(500).json({ error: error.message });
    }
};

