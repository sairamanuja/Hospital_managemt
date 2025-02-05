import jwt from "jsonwebtoken"
import { AdminModel } from '../Models/admin_model.js';

export const adminMiddleware = async (req,res,next) =>{
   
    const token = req.headers.authorization;
    console.log(token);
   if(!token){
   return res.json("please check the token in headers")
   }
   const jwtToken = token.split(" ")[1];
   console.log(jwtToken);
   

   try{

    const JWT_SECRET = "manish12"
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

export const adminMiddlewareNew = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, "manish12"); // Use same secret as login
        const admin = await AdminModel.findById(decoded.id);
        
        if (!admin) {
            return res.status(401).json({ message: "Not authorized" });
        }

        req.admin = {
            id: admin._id,
            email: admin.email
        };

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ message: "Not authorized" });
    }
};