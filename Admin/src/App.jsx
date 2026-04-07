import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllApointment from './pages/Admin/AllApointment.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorList from './pages/Admin/DoctorList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorAppointment from './pages/Doctor/DoctorAppointment.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';


const App = () => {
  const {adminToken}=useContext(AdminContext)
  const {doctorToken}=useContext(DoctorContext)
  
  return adminToken || doctorToken ? (
    <div className='bg-[#F8F9FD]'>
    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* Admin Routes */}
        <Route path='/' element={<></>}/>
        <Route path='/admminDashboard' element={<Dashboard/>}/>
        <Route path='/allApointment' element={<AllApointment/>}/>
        <Route path='/addDoctor' element={<AddDoctor/>}/>
        <Route path='/doctorList' element={<DoctorList/>}/>
        {/* Doctor Routes */}
        <Route path='/doctorDashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctorAppointment' element={<DoctorAppointment/>}/>
        <Route path='/doctorProfile' element={<DoctorProfile/>}/>

      </Routes>
    </div>
  
    </div>
    
  ):(
    <div >
      <Login/>
      <ToastContainer/>
     
      
    </div>
  )
}

export default App