import jwt from "jsonwebtoken"
import { AdminModel } from '../Models/admin_model.js';
import dotenv from "dotenv"

dotenv.config()
export const adminMiddleware = async (req,res,next) =>{
   
    const token = req.headers.authorization;
    console.log(token);
   if(!token){
   return res.json("please check the token in headers")
   }
   const jwtToken = token.split(" ")[1];
   console.log(jwtToken);
   

   try{

    const JWT_SECRET = process.env.JWT_SECRET
    //console.log(JWT_SECRET)
    const decodedToken = jwt.decode(jwtToken,JWT_SECRET)
    console.log(JWT_SECRET)
    if(decodedToken){
      req.admin = { id: decodedToken.id };
        next() 
    }
    else{
       return res.status(400).json({message:"admin not authenticated"})
    }
   }catch(err){
      console.error("admin authentication error ",err)
      return res.status(500).json({message:"admin authentication error"})
   }

}
