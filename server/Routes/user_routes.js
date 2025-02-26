import express from 'express';
const userRouter = express.Router();
import { GetAppointments, profile } from '../Controllers/user_controler.js';
import { bookAppointment } from '../Controllers/user_controler.js';
import { signup } from '../Controllers/user_controler.js';
import { login } from '../Controllers/user_controler.js';
import { userMiddleware } from '../Middleware/usermiddeleware.js';
import { AllDoctor } from '../Controllers/user_controler.js';
import { Doctor } from '../Controllers/user_controler.js';
import { getAllAppointments } from '../Controllers/admin_controler.js';

//import { hospitalMiddleware } from '../Middleware/hospitalMiddleware.js';

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/addAppointment",userMiddleware,bookAppointment)
userRouter.get("/getAppointments",userMiddleware,GetAppointments)
userRouter.get("/profile",userMiddleware,profile)

userRouter.get("/allDoctors",AllDoctor)
userRouter.get("/allAppointment/:id",getAllAppointments)

userRouter.get("/doctor/:id",Doctor)

export default userRouter;

