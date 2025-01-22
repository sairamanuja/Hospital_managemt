import express from 'express';
const adminRouter = express.Router();
import { hospitalMiddleware } from '../Middleware/hospitalMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import { AddDoctor, AllDoctor, createAppointmentByDoctor, login, signup,getAllAppointments, EditDoctor ,deleteAppointmentSlot} from '../Controllers/admin_controler.js';
adminRouter.post('/login', hospitalMiddleware,login);
adminRouter.post('/signup',hospitalMiddleware, signup);
adminRouter.post("/addDoctor",adminMiddleware,AddDoctor)
adminRouter.get("/allDoctor",adminMiddleware,AllDoctor)
adminRouter.post("/addAppointment",adminMiddleware,createAppointmentByDoctor)
adminRouter.get("/allAppointment",adminMiddleware,getAllAppointments)
adminRouter.post("/updateDoctor",adminMiddleware,EditDoctor)
adminRouter.post("/deleteAppointment",adminMiddleware,deleteAppointmentSlot)

export default adminRouter; 