import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app congig 
const app= express()
const port =process.env.port || 4000 
connectDB();
connectCloudinary();


//middlewares
app.use(express.json())
app.use(cors())


//api endPoint 
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
//localhost:4000/api/admin


app.get('/',(req,res)=>{
    res.send('Api working')
})

app.listen(port,()=>console.log('Server Started',port)
)

