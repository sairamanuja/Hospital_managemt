import mongoose  from "mongoose";

const Admin = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    address:String,
    hospital:{type:mongoose.Schema.Types.ObjectId,ref:"Hospitals"}
    
})

export const AdminModel = mongoose.model("Admin",Admin);



