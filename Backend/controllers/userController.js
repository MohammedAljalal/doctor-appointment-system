import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { json } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
// api to register user 
const registerUser=async (req,res)=>{
    try {
        const {name,email,Password}=req.body
        if(!name || !Password || !email ) {
            return res.json({success:false,message:"missing Details"})
        } 

        //validating email format
        if(!validator.isEmail(email)){
           return res.json({success:false,message:"enter a avalid email"}) 
        }   

        //validating strong password
        if (Password.length < 8){
            return res.json({success:false,message:"enter a strong password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
            const hashedpasword = await bcrypt.hash(Password,salt)

            const userData={
                name,
                email,
                Password:hashedpasword
            }
        const newUser=new userModel(userData)
        const user=await newUser.save()
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})
        



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

//api for user login
const userLogin=async (req,res)=>{
   try {
  const { email, Password } = req.body  // صحح الاسم

  const user = await userModel.findOne({ email })
  console.log(user)
  if (!user) {
    return res.json({ success: false, message: 'User does not exist' })
  }

  const isMatch = await bcrypt.compare(Password, user.Password)
  if (!isMatch) {
    return res.json({ success: false, message: 'Invalid credentials' })
  }

  // هنا التوكن راح يرجع للفرونت
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token })  

} catch (error) {
  console.log(error)  // ⚠️ اطبع الخطأ في الكونسول لتعرف السبب
  res.json({ success: false, message: 'Server error' })
}
}

//api to get user profile data
const getProfile=async (req,res)=>{
    try {
      
        const userId=req.user
        const userData=await userModel.findById(userId).select('-Password')
        
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)  // ⚠️ اطبع الخطأ في الكونسول لتعرف السبب
  res.json({ success: false, message: 'Server error' })
        
    }
}

// api to update profile

const updateProfile=async (req,res)=>{
    try {

        
        const userId=req.user
        const {name,email,address,gender,date_Of_Birth,phone}=req.body
        const imageFile=req.file

        let parsedAddress = address
try {
  parsedAddress = JSON.parse(address)
} catch (err) {
  console.log("Address parse error")
}
     
        
        if(!name || !email || !address|| !gender || !date_Of_Birth || !phone){
           return res.json({success:false,message:"missing Details"}) 
        }
        await userModel.findByIdAndUpdate(userId,{name,email,address:parsedAddress,gender,date_Of_Birth,phone})
        if(imageFile){
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url
            console.log(imageUrl)
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})

        }
        res.json({success:true,message:'profile updated'})
    } catch (error) {

        console.log(error)
    res.status(500).json({success:false,message:error.message})  
    }
}

//api to book appoinment
const bookAppointment=async(req,res)=>{
   
    try {
        const userId = req.user; // هذا صح
        console.log(userId)
        const {docId,slotDate,slotTime}=req.body
        const doctorData=await doctorModel.findById(docId).select('-password')
         console.log(doctorData)

        if(!doctorData.available){
            return res.json({success:false,message:'doctor not available'})
        }
        let slots_booked=doctorData.slots_booked
        // checking for slots availablity
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
              return res.json({success:false,message:'slot is not available'})   
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
        const userData=await userModel.findById(userId).select('-password')
        delete doctorData.slots_booked
const appoinmentData = {
    userId,
    docId,
    userData,
    doctorData,
    userDate: userData, // ✅ هذا السطر الناقص
    amount: doctorData.fees,
    slotTime,
    slotDate,
    date: Date.now()
}
        const newAppoitmen= new appointmentModel(appoinmentData)
        await newAppoitmen.save()


        //save new slots data i doctor data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Booked Appointment Successfuly'})
        
    } catch (error) {
      console.log(error)
    res.status(500).json({success:false,message:error.message})   
    }
}
// Apo to get user Appointmet for frontend
const listAppoitment=async (req,res)=>{
    try {
       
        const userId=req.user
        const userAppointment=await appointmentModel.find({userId})
        if(!userAppointment){
            console.log('user hasnot appointment')
        }
       res.json({success:true,data:userAppointment})
        
    } catch (error) {
        console.log(error)
    res.status(500).json({success:false,message:error.message}) 
    }
}

// api to cancelAppointment 
const cancelAppointment=async (req,res)=>{
    try {
        const {appointmentId}=req.body
        console.log(appointmentId)
        const userId=req.user
        console.log(userId)
        const appoinmentData=await appointmentModel.findById(appointmentId)
      

        if(appoinmentData.userId != userId){
            res.status(500).json({success:false,message:'Unotherized Action'}) 

        }
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
export {registerUser,userLogin,getProfile,updateProfile,bookAppointment,listAppoitment,cancelAppointment}
