import express from 'express';
const userRouter = express.Router();
import { GetAppointments } from '../Controllers/user_controler.js';
import { bookAppointment } from '../Controllers/user_controler.js';
import { signup } from '../Controllers/user_controler.js';
import { login } from '../Controllers/user_controler.js';
import { userMiddleware } from '../Middleware/usermiddeleware.js';
import { hospitalMiddleware } from '../Middleware/hospitalMiddleware.js';

userRouter.post("/signup",signup)
userRouter.post("/login",hospitalMiddleware,login)
userRouter.post("/addAppointment",userMiddleware,bookAppointment)
userRouter.get("/getAppointments",userMiddleware,GetAppointments)

export default userRouter;

