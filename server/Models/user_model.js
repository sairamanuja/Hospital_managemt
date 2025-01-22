import mongoose  from "mongoose";

const User = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    address:String,
    gender:String,
    
    
   
    
})

export const UserModel = mongoose.model("User",User);