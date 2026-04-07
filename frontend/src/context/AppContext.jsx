import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const currencysymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [token,setToken]=useState(localStorage.getItem('userToken') || false)
    console.log(token)
    const [doctors,setDoctors]=useState([])
    const [userData,setUserData]=useState(false)


        const getDoctorData=async ()=>{
            try {
                const {data}=await axios.get(backendUrl +  '/api/doctor/list')
                console.log(data)
                if(data.success){
                    setDoctors(data.doctors)
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
        }

        const loadUserProfileData=async ()=>{
            try {
                const {data}=await axios.get(backendUrl + '/api/user/profile',{headers: {
  Authorization: token
}})
console.log(data)
                if (data.success){
                    
                    setUserData(data.userData)
                }
                else{
                    toast.error(data.message)
                }
                
            } catch (error) {
             console.log(error)
                toast.error(error.message)   
            }
        }
        const value={
        doctors,currencysymbol,backendUrl,token,setToken,getDoctorData,
    userData,setUserData,loadUserProfileData
}
        useEffect(()=>{
            getDoctorData()
        },[])
        useEffect(()=>{
            if(token){
                loadUserProfileData()
            }else{
                setUserData(false)
            }

        },[token])
    return <AppContext.Provider value={value}>
        
            {props.children}

        
    </AppContext.Provider>

}

export default AppContextProvider;