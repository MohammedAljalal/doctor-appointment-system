import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken") || null,
  );

  const [appointmentData, setAppointmentData] = useState([]);
  const [dashboardData,setDashboardData]=useState(false)
  const [doctorProfile,setDoctorProfile]=useState(false)

  const getAppointmentData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctorAppointments",
        {
          headers: {
            authorization: doctorToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setAppointmentData(data.appointmentsData);
        console.log(data.appointmentsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentcomplete=async (appointmentId)=>{
    try {
         const { data } = await axios.post(
        backendUrl + "/api/doctor/appointmentcomplete",{appointmentId},
        {
          headers: {
            authorization: doctorToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getAppointmentData()

      await doctorDashboard();
        
      } else {
        toast.error(data.message);
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

   const appointmentCancellled=async (appointmentId)=>{
    try {
         const { data } = await axios.post(
        backendUrl + "/api/doctor/appointmentCancellled",{appointmentId},
        {
          headers: {
            authorization: doctorToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getAppointmentData()

      await doctorDashboard();  
        
      } else {
        toast.error(data.message);
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const doctorDashboard=async ()=>{
    try {
      const { data } = await axios.get(
        backendUrl + '/api/doctor/doctorDashboard',
        {
          headers: {
            authorization: doctorToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setDashboardData(data.dashboardData);
        
        console.log(data.dashboardData);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const getDoctoprProfile=async ()=>{
    try {
       const { data } = await axios.get(
        backendUrl + "/api/doctor/doctorProfile",
        {
          headers: {
            authorization: doctorToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      
      if (data.success) {
        toast.success(data.message);
        setDoctorProfile(data.profileData);
        
        console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    backendUrl,
    doctorToken,
    setDoctorToken,
    appointmentData,
    setAppointmentData,
    getAppointmentData,
    appointmentCancellled,
    appointmentcomplete,
    dashboardData,setDashboardData,doctorDashboard,
    doctorProfile,setDoctorProfile,getDoctoprProfile
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
