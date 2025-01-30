/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";

const AttendanceTeacher = () => {
  const [classes, setClasses] = useState([]);

  const fetchAttendeeClass = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or context

    try {
      const response = await axios.get(`${baseAPI}/class/attendee`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      });
      console.log("Attendee class Res:", response);
    } catch (error) {
      console.log("Error in fetching all Teacher Attendee Data", error);
    }
  };

  useEffect(() => {
    fetchAttendeeClass();
  }, []);

  return (
    <>
      <h1>Teacher Attendance</h1>
    </>
  );
};

export default AttendanceTeacher;
