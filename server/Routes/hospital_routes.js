import express from 'express';
const router = express.Router();
import {  AllHospital } from '../Controllers/hospital_controler.js';
import { hospitalMiddleware } from '../Middleware/hospitalMiddleware.js';
import { selectHospital, createHospital } from '../Controllers/hospital_controler.js';


router.post("/selectHospital",selectHospital)
router.post("/createHospital",createHospital)
router.get("/allHospital",AllHospital)

export default router;