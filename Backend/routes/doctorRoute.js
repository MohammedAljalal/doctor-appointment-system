import express from 'express'
import { appointmentCancellled, appointmentcomplete, doctorAppointments, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js'
import authAdmin from '../middlewares/authAdmin.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter=express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/loginDoctor',loginDoctor)
doctorRouter.get('/doctorAppointments',authDoctor,doctorAppointments)
doctorRouter.post('/appointmentcomplete',authDoctor,appointmentcomplete)
doctorRouter.post('/appointmentCancellled',authDoctor,appointmentCancellled)
doctorRouter.get('/doctorDashboard',authDoctor,doctorDashboard)
doctorRouter.get('/doctorProfile',authDoctor,doctorProfile)
doctorRouter.post('/updatedoctorprofile',authDoctor,updateDoctorProfile)

export default doctorRouter