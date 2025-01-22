import jwt from "jsonwebtoken"

export const hospitalMiddleware = async (req,res,next) =>{
   
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
      req.hospital = { id: decodedToken.id };
        next() 
    }
    else{
       return res.status(400).json({message:"hospital not authenticated"})
    }
   }catch(err){
      console.error("hospital authentication error ",err)
      return res.status(500).json({message:"hospital authentication error"})
   }

}