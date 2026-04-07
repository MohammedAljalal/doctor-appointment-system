import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {
  const {
    doctorToken,
    getAppointmentData,
    appointmentData,
    appointmentcomplete,
    appointmentCancellled,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, formatTime, currency } =
    useContext(AppContext);
  console.log(appointmentData);

  useEffect(() => {
    if (doctorToken) {
      getAppointmentData();
    }
  }, [doctorToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr__1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b ">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointmentData?.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full  bg-gray-200"
                src={item?.userData?.image || assets.doctor_icon}
                alt=""
              />
              <p>{item?.userData?.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                Online
              </p>
            </div>

            <p className="max-sm:hidden">
              {calculateAge(item?.userData?.date_Of_Birth)}
            </p>
            <p>
              {slotDateFormat(item?.slotDate)},{formatTime(item?.slotTime)}
            </p>
            <p>
              {currency}
              {item?.amount}
            </p>
            {item?.cancelled ? (
              <p className="text-red-400 text-xs font-medium">cancelled</p>
            ) : item?.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => appointmentCancellled(item?._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => appointmentcomplete(item?._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}

            {/* {
                      item?.cancelled ? <p className='text-red-400 text-xs font-medium'>cancelled</p>:
                      <img  className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    } */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
