import express from 'express';
const router = express.Router();

router.get('/available-slots/:doctorId/:date', getAvailableSlots);
router.post('/book', bookAppointment);
router.get('/doctor-schedule/:doctorId/:startDate', getDoctorSchedule);

export default router; 