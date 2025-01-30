/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const AttendanceTeacher = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const fetchAttendeeClass = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or context

    try {
      const response = await axios.get(`${baseAPI}/class/attendee`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      });
      console.log("Attendee class Res:", response);
      setClasses(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedClass(response.data.data[0]);
      }
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
      {classes.length > 0 ? (
        <Paper
          sx={{
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              You are attende of {classes.length} classes.
            </Alert>
            <FormControl sx={{ minWidth: "250px" }}>
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClass}
                label="Class"
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                }}
              >
                <MenuItem value={""}>Select Class</MenuItem>
                {classes.map((x) => (
                  <MenuItem key={x._id} value={x._id}>
                    {x.class_text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>
      ) : (
        <Alert severity="error">You are not an Attendee on any class.</Alert>
      )}
    </>
  );
};

export default AttendanceTeacher;
