import React from "react";

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Contact from "./pages/Contact";
import About from './pages/About'
import Appointment from "./pages/Appointment";
import Navbar from "./component/Navbar";
import Header from "./component/Header";
import Fotter from "./component/Fotter";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App=()=>{
  return (
    <div className="mx-4 sm:mx-[10%]" >
      <ToastContainer/>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/myappointment' element={<MyAppointment/>}/>
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
      </Routes>
      <Fotter/>
    </div>
  )
}

export default  App;



//
// 👉 Source Code: https://greatstack.dev/p/prescripto-f...
// 👉 Live Preview: https://prescripto.vercel.app/
// 👉 Download the assets: https://greatstack.dev/assets/prescri...
// 👉 Figma Design: https://greatstack.dev/go/figma-presc...

