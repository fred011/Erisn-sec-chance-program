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

  const [attendanceStatus, setAttendanceStatus] = useState({});

  const submitAttendance = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      console.log("No token found, authentication required.");
      return;
    }

    try {
      await Promise.all(
        students.map((student) =>
          singleStudentAttendance(
            student._id,
            attendanceStatus[student._id],
            token
          )
        )
      );
      alert("Attendance marked successfully!");
      fetchStudents(); // Refresh student data
    } catch (error) {
      console.error("Error in submitAttendance [marking attendance]", error);
    }
  };

  const handleAttendance = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };

  const singleStudentAttendance = async (studentId, status) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or context
    try {
      // studentId, date, status, classId
      const response = await axios.get(
        `${baseAPI}/attendance/mark`,
        { studentId, date: new Date(), classId: selectedClass, status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        }
      );
      console.log("Marking Attendance", response);
    } catch (error) {
      console.log("Error in marking attendence", error);
    }
  };

  const fetchAttendeeClass = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    try {
      const response = await axios.get(`${baseAPI}/class/attendee`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      });

      console.log("Attendee class Res:", response);
      setClasses(response.data.data);

      if (response.data.data.length > 0) {
        setSelectedClass(response.data.data[0]._id); // Set only the _id, not the whole object
      }
    } catch (error) {
      console.log("Error in fetching all Teacher Attendee Data", error);
    }
  };

  useEffect(() => {
    fetchAttendeeClass();
  }, []);

  const [students, setStudents] = useState([]);
  const [attendanceChecked, setAttendanceChecked] = useState(false);
  const checkAttendanceAndFetchStudents = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    try {
      if (selectedClass) {
        const responseStudent = await axios.get(
          `${baseAPI}/student/fetch-with-query`,
          {
            params: { student_class: selectedClass },
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        const responseCheck = await axios.get(
          `${baseAPI}/attendance/check/${selectedClass}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        console.log("Check Attendance:", responseCheck);
        if (!responseCheck.data.attendanceTaken) {
          setStudents(responseStudent.data.students);
          responseStudent.data.students.forEach((student) => {
            handleAttendance(student._id, "present");
          });
        } else {
          setAttendanceChecked(true);
        }
      }
    } catch (error) {
      console.log("Error in Check Attendance", error);
    }
  };

  useEffect(() => {
    checkAttendanceAndFetchStudents();
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
                value={selectedClass || ""}
                label="Class"
                onChange={(e) => {
                  setSelectedClass(e.target.value); // Ensure value is an _id
                  setAttendanceChecked(false);
                }}
              >
                <MenuItem value="">Select Class</MenuItem>
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
        <Alert severity="error">You are not an Attendee of any class.</Alert>
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
        <>
          <Alert severity="error">
            {attendanceChecked
              ? "Attendance Already taken for this class today"
              : "There are no students in this class."}
          </Alert>
        </>
      )}
    </>
  );
};

export default AttendanceTeacher;
