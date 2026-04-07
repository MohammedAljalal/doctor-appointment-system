import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const {adminToken}=useContext(AdminContext)
  const {doctorToken}=useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r '>
      {
        adminToken && <ul className='text-[#515151] mt-5' >
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/admminDashboard'}>
           <img src={assets.home_icon} alt="" />
           <p className='hidden md:block'>Dashboard</p>
          </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/allApointment'}>
           <img src={assets.appointment_icon} alt="" />
           <p className='hidden md:block'>Appointment</p>
          </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/addDoctor'}>
           <img src={assets.add_icon} alt="" />
           <p className='hidden md:block'>AddDoctor</p>
          </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/doctorList'}>
           <img src={assets.people_icon} alt="" />
           <p className='hidden md:block'>DoctorList</p>
          </NavLink>
        </ul>
      }
      {
        doctorToken && <ul className='text-[#515151] mt-5' >
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/doctorDashboard'}>
           <img src={assets.home_icon} alt="" />
           <p className='hidden md:block'>Dashboard</p>
          </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/doctorAppointment'}>
           <img src={assets.appointment_icon} alt="" />
           <p className='hidden md:block'>Appointment</p>
          </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border border-r-4 !border-r-primary ':''}`} to={'/doctorProfile'}>
           <img src={assets.people_icon} alt="" />
           <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar