/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const AttendanceTeacher = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [attendanceStatus, setAttendanceStatus] = useState();

  const handleAttendance = () => {};
  const submitAttendance = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };

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

  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    axios
      .get(`${baseAPI}/student/fetch-with-query`, {
        params: { student_class: selectedClass },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((res) => {
        console.log("Response Students", res.data.students); // Inspect the response
        setStudents(res.data.students);
        res.data.students.forEach((student) => {
          handleAttendance(student._id, "present");
        });
      })
      .catch((e) => {
        console.log("Error in fetching students", e.response || e.message);
      });
  };
  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

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

      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="exam table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Student Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <FormControl sx={{ minWidth: "250px" }}>
                      <InputLabel>Attendance</InputLabel>
                      <Select
                        value={attendanceStatus[student._id]}
                        label="Attendance"
                        onChange={(e) => {
                          handleAttendance(student._id.e.target.value);
                        }}
                      >
                        <MenuItem value={"present"}>Present</MenuItem>
                        <MenuItem value={"absent"}>Absent</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button varient="constained" onClick={submitAttendance}>
            Take Attendance
          </Button>
        </TableContainer>
      ) : (
        <Alert severity="error">There are no students in this class.</Alert>
      )}
    </>
  );
};

export default AttendanceTeacher;
