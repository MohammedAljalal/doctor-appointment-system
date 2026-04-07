import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state,setState]=useState('Sign Up')
  const [email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [name,setName]=useState('')
  const {backendUrl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate()

 const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    // نجمع البيانات اللي نرسلها
    const payload = state === "Sign Up"
      ? { name, email, Password: Password } // عند تسجيل حساب جديد
      : { email, Password: Password };      // عند تسجيل الدخول

    // نحدد الرابط حسب الحالة
    const url = state === "Sign Up"
      ? backendUrl + "/api/user/register"
      : backendUrl + "/api/user/login";

      const { data } = await axios.post(url, payload);

    if (data.success) {
      // خزن التوكن إذا موجود
      if (data.token) {
        localStorage.setItem("userToken", data.token);
        setToken(data.token)
        toast.success(state === "Sign Up" 
          ? "تم إنشاء الحساب بنجاح!" 
          : "تم تسجيل الدخول بنجاح!");
      } else {
        toast.success(data.message || "Success!");
      }
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
}

useEffect(()=>{
  if(token){
    navigate('/')
   
  }
},[token])
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl tsxt-zinc-600 text-sm shadow-lg '>
          <p className='text-2xl font-semibold '>
            {state==='Sign Up' ? 'Create Account':'Login'}
          </p>
          <p>Please {state==='Sign Up' ? 'Sign Up':'Log in'} to book appointment</p>
          {
            state==='Sign Up' && 
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required  />
          </div>}

          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setEmail(e.target.value)} value={email} required />
          </div>

          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setPassword(e.target.value)} value={Password} required />
          </div>
          <button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base '>{state==='Sign Up' ? 'Create Account':'Login'}</button>
          {
            state==='Sign Up'? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer '>login here</span></p>:
            <p>Create an new account ? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer '>click here</span></p>
          }
        </div>
      </form>

    </div>
  )
}

export default Login