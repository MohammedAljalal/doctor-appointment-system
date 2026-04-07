import React from "react";
import { createContext } from "react";

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const currency='$'
    
    const calculateAge=(dob)=>{
         if (!dob) return 0
        const today=new Date()
        const birthDate=new Date(dob)
        if(isNaN(birthDate)) return 0

        let age=today.getFullYear()-birthDate.getFullYear()
        return age

    }
    const formatTime = (dateTime) => {
  if (!dateTime) return ""

  return dateTime
    .replace("ص", "AM")
    .replace("م", "PM")
}
    const month=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const slotDateFormat=(slotDate)=>{
    if (!slotDate) return "No Date"
    const dateArray=slotDate.split('_')
    return dateArray[0]+ " " + month[Number(dateArray[1])] + " " + dateArray[2]
  }
    const value={
        calculateAge,slotDateFormat,formatTime,currency

    }
    return(
        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>
    )


}
export default AppContextProvider;