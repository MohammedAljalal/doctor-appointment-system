import React, { useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {doctorProfile,setDoctorProfile,getDoctoprProfile,doctorToken,backendUrl}=useContext(DoctorContext)
  const {currency}=useContext(AppContext)
  const [isEdit,setIsEdit]=useState(false)
  const updateDoctorProfile=async()=>{
    try {
      const updateData={
        about:doctorProfile?.about,
        fees:doctorProfile?.fees,
        address:doctorProfile?.address,
        available:doctorProfile?.available,
        


      }
      const { data } = await axios.post(
        backendUrl + '/api/doctor/updatedoctorprofile',updateData,
        {
          headers: {
            authorization: doctorToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false)
        getDoctoprProfile()

        

       
        
      } else {
        toast.error(data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }


  useEffect(()=>{
    if(doctorToken){
      getDoctoprProfile()
    }
  },[doctorToken])
  return doctorProfile && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg'  src={doctorProfile?.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
            
            {doctorProfile?.name}</p>
            <div className='flex items-center gap-2 mt-1 text-gray-600'>
              <p>
                {doctorProfile?.degree} - {doctorProfile?.speciality}
                
              </p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{doctorProfile?.experience}</button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-sm font-mediumte text-neutral-800 mt-3'>About:</p>
              <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{isEdit ? <input type="text" value={doctorProfile?.about} onChange={(e)=>setDoctorProfile(prev => ({...prev, about: e.target.value}))} />: doctorProfile?.about}</p>
            </div>
            <p className='text-gray-600 font-medium mt-4'>Appointments Fees: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" value={doctorProfile?.fees} onChange={(e)=>setDoctorProfile(prev => ({...prev, fees: e.target.value}))} />: doctorProfile?.fees}</span></p>
            <div className='flex gap-2 py-2'>
              <p>Address :</p>
              <p className='text-sm'>
                {isEdit ? <input type="text" value={doctorProfile?.address.line1} onChange={(e)=>setDoctorProfile(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} />: doctorProfile?.address.line1}
                <br />
                { isEdit ? <input type="text" value={doctorProfile?.address.line2} onChange={(e)=>setDoctorProfile(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} />: doctorProfile?.address.line2}
              </p></div>
              
              <div className='fex gap-1 pt-2'>
                <input 
  type="checkbox" 
  checked={ doctorProfile?.available} 
  onChange={(e)=>setDoctorProfile(prev => ({
    ...prev,
    available: e.target.checked
  }))}
/>
                <label htmlFor="">available</label>
              </div>
              {isEdit ? (
                <button onClick={updateDoctorProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              ) : (
                <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
              )}
          
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile