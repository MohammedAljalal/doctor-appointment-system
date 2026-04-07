import express from 'express'
import { allDoctors,addDoctor,loginAdmin, appointmentAdmin, AdminCancelAppointment, adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/allDoctors',authAdmin,allDoctors)
adminRouter.post('/changeAvailable',authAdmin,changeAvailablity)
adminRouter.get('/allAppointment',authAdmin,appointmentAdmin)
adminRouter.post('/AdminCancelAppointment',authAdmin,AdminCancelAppointment)
adminRouter.get('/adminDashboard',authAdmin,adminDashboard)


export default adminRouter;
