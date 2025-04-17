import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()
export const ConnectDB = async ()=>{
    try {
        const MONGOURL = process.env.MONGO_URI
        //console.log(MONGOURL) 
      await mongoose.connect(MONGOURL);
        console.log("database Connected")
    } catch (error) {
        console.error("database Connected",error)
        
    }
} 