import mongoose  from "mongoose";

const hospital = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    address:String,
    
})

export const hospitalModel = mongoose.model("Hospitals",hospital);



