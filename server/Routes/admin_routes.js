import express from 'express';
const adminRouter = express.Router();
import { hospitalMiddleware } from '../Middleware/hospitalMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import { Doctor } from '../Controllers/admin_controler.js';
import { AddDoctor, AllDoctor, createAppointmentByDoctor, login, signup,getAllAppointments, EditDoctor ,deleteAppointmentSlot} from '../Controllers/admin_controler.js';
adminRouter.post('/login',login);
adminRouter.post('/signup', signup);
adminRouter.post("/addDoctor",adminMiddleware,AddDoctor)

adminRouter.get("/allDoctor",adminMiddleware,AllDoctor)
adminRouter.post("/addAppointment",adminMiddleware,createAppointmentByDoctor)
adminRouter.get("/allAppointment/:id",adminMiddleware,getAllAppointments)
adminRouter.post("/updateDoctor",adminMiddleware,EditDoctor)
adminRouter.delete("/deleteSlot/:appointmentId/:slotId", adminMiddleware, deleteAppointmentSlot)
//adminRouter.post("/doctorSpeciality",adminMiddleware,DoctorSpeciality)
adminRouter.get("/doctor/:id",adminMiddleware,Doctor)
export default adminRouter; 