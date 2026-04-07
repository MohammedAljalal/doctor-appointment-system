import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
       const specialities = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist"
];

  const navigate=useNavigate()
  const { speciality }=useParams()
  const {doctors}=useContext(AppContext)
  const [filterDoctors,setFilterDoctors]=useState([])
  const [showFilter,setShowFilter]=useState(false)
  const applyFilter=()=>{
    if (speciality){
      setFilterDoctors(doctors.filter(doctor=>doctor.speciality===speciality))
    }else{
      setFilterDoctors(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()

  },[doctors,speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-primary text-white': ''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex': 'hidden sm:flex'}`}>
     
{specialities.map((item, index) => (
  <p
    key={index}
    onClick={() =>
      speciality === item
        ? navigate("/doctors")
        : navigate(`/doctors/${item}`)
    }
    className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
      speciality === item ? "bg-indigo-100 text-black" : ""
    }`}
  >
    {item}
  </p>
))}
        </div>
      
      <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 gap-y-6'>
        {
          filterDoctors.map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-blue-50 ' src={ item.image} alt="" />
                        <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}> 
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}> </p>
                            <p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-gray-90 text-lg font-medium '>{item.name}</p>
                        <p className='text-gray-600 text-sm '>{item.speciality}</p>
                        </div>
                    </div>


                ))
        }
      </div>
    </div>
    </div>
  )
}

export default Doctors