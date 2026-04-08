import React from 'react'
import Header from '../component/Header'
import SpecialityMenu from '../component/SpecialityMenu'
import TopDoctors from '../component/TopDoctors'
import Banner from '../component/Banner'

// This is the home page of the application which will display the header, speciality menu, top doctors and banner.

const Home = () => {
  return (
    <div>
     <Header/>
     <SpecialityMenu/>
     <TopDoctors/>
     <Banner/>
    </div>
  )
}

export default Home