import jwt from "jsonwebtoken"

export const userMiddleware = async (req,res,next) =>{
   
    const token = req.headers.authorization;
    console.log(token);
   if(!token){
   return res.json("please check the token in headers")
   }
   const jwtToken = token.split(" ")[2];
   console.log(jwtToken);
   

   try{

    const JWT_SECRET = "manish12"
    const decodedToken = jwt.decode(jwtToken,JWT_SECRET)
    console.log(JWT_SECRET)
    if(decodedToken){
      req.user = { id: decodedToken.id };
      req.hospital = { id: decodedToken.hospital };
        next() 
    }
    else{
       return res.status(400).json({message:"user not authenticated"})
    }
   }catch(err){
      console.error("user authentication error ",err)
      return res.status(500).json({message:"user authentication error"})
   }

}