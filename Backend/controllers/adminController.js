import validator from 'validator'
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'


// api for adding 
const addDoctor=async(req,res)=>{
    try {
        const {name,email,Password,speciality,degree,experience,about,fees,address}=req.body
        if (!req.file) {
  return res.json({ success: false, message: "Image is required" })
}
        const image=req.file
        
        
        console.log("REQ.FILE:", req.file)
console.log("REQ.BODY:", req.body)


       //checking for all data to add doctor 
       if (!name || !email || !Password || !speciality || !degree || !about || !fees || !address  ){
        return res.json({success:false,message:"errrrrror"})
       }
       // validating email format
       if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter avalide email"})
       }
       
       const isFoud= await doctorModel.findOne({email})
       if(isFoud){
        return res.json({success:false,message:" this email is found"})

       }
       //validating strong password

       if(Password.length <8){
        return res.json({success:false,message:"please enter a strong password"})
       }

       // hashing doctor password
       const salt=await bycrypt.genSalt(10)
       const hashedPassword=await bycrypt.hash(Password,salt)

       //upload image to cloudinary 
       const imageUpload=await cloudinary.uploader.upload(image.path,{resource_type:"image"})
       const imageUrl=imageUpload.secure_url


       const doctorData={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
       }
       const newDoctor=new doctorModel(doctorData)
       newDoctor.save()
       return res.json({success:true,message:"doctor added succefuly"})



        
    } catch (error) {
        console.log(error)
       return res.json({success:false,message:error.message})
        
    }
}
//api for admin login
const loginAdmin=async(req,res)=>{
try {
    const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
      const response= res.json({success:true,token})
       return response
    }else{
        res.json({success:false,message:"invalid credentials"})
    }
    
} catch (error) {
    console.log(error)
       return res.json({success:false,message:error.message})
    
}
}
// Api to get all doctor list from database for admin panal
const allDoctors=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-Password')
        res.json({success:true,doctors})
        
        
    } catch (error) {
         console.log(error)
       return res.json({success:false,message:error.message})
        
    }
}

//api to get all appointment list 
const appointmentAdmin=async (req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
       return res.json({success:false,message:error.message})
    }
}

// api to cancelled the Appointment from Admin
const AdminCancelAppointment=async (req,res)=>{
    try {
        const {appointmentId}=req.body
        console.log(appointmentId)
        const appoinmentData=await appointmentModel.findById(appointmentId)
      

        
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        const {docId,slotDate,slotTime}=appoinmentData

        const doctorData=await doctorModel.findById(docId)
        
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e !==slotTime)

       
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        
        

        res.json({success:true,message:'Appointmet Canceled'})
        
    } catch (error) {
       console.log(error)
    res.status(500).json({success:false,message:error.message})   
    }
}

//api to get data about Doctor and Appointmet  to the Admin Dashboard
const adminDashboard=async (req,res)=>{
    try {
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appoinments=await appointmentModel.find({})

        const dashboardData={
            doctors:doctors.length,
            appoinments:appoinments.length,
            patients:users.length,
            latestAppointments:appoinments.reverse().slice(0,5)


        }
        res.json({success:true,dashboardData})
        
    } catch (error) {
        console.log(error)
    res.status(500).json({success:false,message:error.message})  
    }
}



export {addDoctor,loginAdmin,allDoctors,appointmentAdmin,AdminCancelAppointment,adminDashboard}