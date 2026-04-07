import React, { useState } from 'react'


import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate =useNavigate();
  const [showMenu,setShowMenu]=useState(false)
  const {token,setToken,userData,setUserData}=useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false)

  const closeTimeout = React.useRef(null)

  const logOut=()=>{
    setToken('')
    localStorage.removeItem('userToken')
  }

  return (

    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      
      {/* الشعار */}
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />

      {/* القوائم */}
     <ul className="hidden md:flex items-start gap-6 font-medium">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `relative cursor-pointer text-sm transition-colors duration-300 ${
        isActive ? 'text-primary' : 'text-gray-700'
      }`
    }
  >
    <li className='py-1'>HOME</li>
    <span
      className={`
        absolute left-0 bottom-0 h-0.5 bg-[#5f6FFF]
        transition-all duration-300
        ${window.location.pathname === '/' ? 'w-full' : 'w-0'}
        hover:w-full
      `}
    />
  </NavLink>

  <NavLink
    to="/doctors"
    className={({ isActive }) =>
      `relative cursor-pointer text-sm transition-colors duration-300 ${
        isActive ? 'text-[#5f6FFF]' : 'text-gray-700'
      }`
    }
  >
    <li className='py-1'>ALL DOCTORS</li>
    <span
      className={`
        absolute left-0 bottom-0 h-0.5 bg-[#5f6FFF]
        transition-all duration-300
        ${window.location.pathname === '/doctors' ? 'w-full' : 'w-0'}
        hover:w-full
      `}
    />
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) =>
      `relative cursor-pointer text-sm transition-colors duration-300 ${
        isActive ? 'text-[#5f6FFF]' : 'text-gray-700'
      }`
    }
  >
    <li className='py-1'>ABOUT</li>
    <span
      className={`
        absolute left-0 bottom-0 h-0.5 bg-[#5f6FFF]
        transition-all duration-300
        ${window.location.pathname === '/about' ? 'w-full' : 'w-0'}
        hover:w-full
      `}
    />
  </NavLink>

  <NavLink
    to="/contact"
    className={({ isActive }) =>
      `relative cursor-pointer text-sm transition-colors duration-300 ${
        isActive ? 'text-[#5f6FFF]' : 'text-gray-700'
      }`
    }
  >
    <li className='py-1'>CONTACT</li>
    <span
      className={`
        absolute left-0 bottom-0 h-0.5 bg-[#5f6FFF]
        transition-all duration-300
        ${window.location.pathname === '/contact' ? 'w-full' : 'w-0'}
        hover:w-full
      `}
    />
  </NavLink>
</ul>

      {/* زر إنشاء حساب */}
     <div className='flex items-center gap-4'>
        {token ? (
         <div
  className='flex items-center gap-2 cursor-pointer relative'
  onClick={() => setShowDropdown(prev => !prev)}
>

              <img  className='w-8 rounded-full' src={userData?.image ? userData?.image:assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />

            
           <div
  className={`
    absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20
    ${showDropdown ? 'block' : 'hidden'}
  `}
>

    <div className=' min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
      <p onClick={()=>navigate('MyProfile')} className='px-3 py-2  rounded-lg
  hover:bg-blue-50 hover:text-blue-600
  cursor-pointer transition'>
  My Profile
</p>

<p onClick={()=>navigate('MyAppointment')} className='px-3 py-2 rounded-lg
  hover:bg-blue-50 hover:text-blue-600
  cursor-pointer transition'>
  My Appointment
</p>

<hr className='my-1 border-gray-200' />

<p onClick={logOut} className='px-3 py-2 rounded-lg
  hover:bg-red-50 hover:text-red-500
  cursor-pointer transition'>
  Logout
</p>

    </div>
  </div>
           
          </div>
        ) : (
          <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white md:px-8 py-3 font-light rounded-full '
          >
            Create Account
          </button>
          </div>
        )}
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
        {/* mobile menue */}
        <div className={`${showMenu ? 'fixed w-full ' : 'h-0 w-0 '} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium '>
            <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded  inline-block'>HOME</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded  inline-block'>ALL DOCTORS</p> </NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded  inline-block'>ABOUT</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded  inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
