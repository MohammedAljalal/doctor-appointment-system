import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || null,
  );
  const [dashboardData, setDashboardData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/allDoctors",
        {},
        {
          headers: {
            authorization: adminToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeAvailable = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/changeAvailable",
        { docId },
        {
          headers: {
            authorization: adminToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/allAppointment",
        {
          headers: {
            authorization: adminToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const AdminCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/AdminCancelAppointment",
        { appointmentId },
        { headers: { Authorization: adminToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/admin/adminDashboard',
        {
          headers: {
            authorization: adminToken, // نفس اسم الهيدر في الـ backend
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setDashboardData(data.dashboardData);
        console.log(data.dashboardData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailable,
    appointments,
    setAppointments,
    getAllAppointments,
    AdminCancelAppointment,
    dashboardData,
    setDashboardData,
    getDashboardData,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
