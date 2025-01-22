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
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "enter name" });
    }
    try {
            const admin = await hospitalModel.findOne({ name });
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }
        
        const JWT_SECRET = "manish12"
        const token = jwt.sign({ id: admin._id }, JWT_SECRET);
        if(token){
            return res.status(200).json({ message: "admin logged in successfully", token });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const AllHospital = async (req, res) => {
    try {
        const hospitals = await hospitalModel.find({}, 'name');
        
        const hospitalNames = hospitals.map(hospital => hospital.name);
        
        res.status(200).json({ names: hospitalNames });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};




