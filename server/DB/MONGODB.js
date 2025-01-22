import mongoose from "mongoose"

export const ConnectDB = async ()=>{
    try {
        const MONGOURL = "mongodb+srv://ramanuja39:sairama%40123@cluster0.580qe.mongodb.net/db"
      await mongoose.connect(MONGOURL);
        console.log("database Connected")
    } catch (error) {
        console.error("database Connected",error)
        
    }
} 