import { AppointmentModel_doctor } from "../Models/appointment_doctor.js";
import { AppointmentModel_user } from "../Models/appointment_user.js";
import { UserModel } from "../Models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
         if (!user) {
             return res.status(404).json({ message: "user not found" });
         }
         const isPasswordCorrect = await bcrypt.compare(password, user.password);
         if (!isPasswordCorrect) {
             return res.status(401).json({ message: "invalid password" });
         }
         const JWT_SECRET = "manish12"
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
        
        if (!patientId || !date || !startTime || !endTime || !doctorId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        
        const updatedDoctorSlot = await AppointmentModel_doctor.findOneAndUpdate(
            {
                doctor: doctorId,
                "availability.date": date,
                "availability.slots.startTime": startTime,
                "availability.slots.endTime": endTime,
                "availability.slots.isBooked": false
            },
            {
                $set: { "availability.$.slots.$[slot].isBooked": true }
            },
            {
                arrayFilters: [{ "slot.startTime": startTime, "slot.endTime": endTime }],
                new: true
            }
        );

        if (!updatedDoctorSlot) {
            return res.status(400).json({ message: "Slot not available or already booked" });
        }

        // Create user appointment
        const newUserAppointment = new AppointmentModel_user({
            user: patientId,
            doctor: doctorId,
            availability: [{
                day: new Date(date).toLocaleString("en-us", { weekday: "long" }),
                date: date,
                slots: [{
                    startTime,
                    endTime,
                    isBooked: true
                }]
            }]
        });

        await newUserAppointment.save();

        return res.status(201).json({
            message: "Appointment booked successfully",
            appointment: newUserAppointment
        });

    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({ message: "Failed to book appointment" });
    }
};

