import express from 'express'
import {bookAppointment, cancelAppointment, getProfile, listAppoitment, registerUser, updateProfile, userLogin } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/profile',authUser,getProfile)
userRouter.post('/updateProfile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/listAppoitment',authUser,listAppoitment)
userRouter.post('/cancelAppointment',authUser,cancelAppointment)




export default userRouter