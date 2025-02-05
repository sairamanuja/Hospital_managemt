import {hospitalModel} from "../Models/hospital_model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const createHospital =async (req,res)=>{
   
 const {email,password,name,address,phone}= req.body;
    if(!email||!password|| !name ||!address ||!phone){
        return res.status(400).json({ message:"enter all the details"})

    }
    try{
          const admin = await  hospitalModel.findOne({email})
          if(admin){
            return res.status(401).json({message:"user exist"})
          }
          const hashedPassword = await bcrypt.hash(password,10);

          const newadmin = await hospitalModel.create({
            email,
            password:hashedPassword,
            name,
            address,
            phone
          })
          if(newadmin){
            return res.status(200).json({message:"Hospital created sucessfully"})
          }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"internal server error "})
    }

}

export const selectHospital = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "enter id" });
    }
    try {
            const hospital = await hospitalModel.findOne({ _id: id  });
        if (!hospital) {
            return res.status(404).json({ message: "hospital not found" });
        }
        
        const JWT_SECRET = "manish12"
        const token = jwt.sign({ id: hospital._id }, JWT_SECRET);
        if(token){
            return res.status(200).json({ message: "hospital selected successfully", token });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const AllHospital = async (req, res) => {
    try {
        
        const hospitals = await hospitalModel.find({});
        const hospitalData = hospitals.map(hospital => ({
            id: hospital._id,
            name: hospital.name
        }));
        
        res.status(200).json({ hospitals: hospitalData });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};




