/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AttendanceTeacher = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceChecked, setAttendanceChecked] = useState(false);

  useEffect(() => {
    const fetchAttendeeClass = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${baseAPI}/class/attendee`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClasses(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedClass(response.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching classes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendeeClass();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;

    const checkAttendanceAndFetchStudents = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const [studentResponse, attendanceResponse] = await Promise.all([
          axios.get(`${baseAPI}/student/fetch-with-query`, {
            params: { student_class: selectedClass },
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseAPI}/attendance/check/${selectedClass}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!attendanceResponse.data.attendanceTaken) {
          setStudents(studentResponse.data.students);
        } else {
          setAttendanceChecked(true);
        }
      } catch (error) {
        console.error("Error fetching students", error);
      } finally {
        setLoading(false);
      }
    };

    checkAttendanceAndFetchStudents();
  }, [selectedClass]);

  return (
    <>
      <h1>Teacher Attendance</h1>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {classes.length > 0 ? (
            <Paper
              sx={{
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                You are an attendee of {classes.length} classes.
              </Alert>
              <FormControl sx={{ minWidth: "250px" }}>
                <InputLabel>Class</InputLabel>
                <Select
                  value={selectedClass || ""}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
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
            </Paper>
          ) : (
            <Alert severity="error">
              You are not an attendee of any class.
            </Alert>
          )}

          {students.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Student Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

export default AttendanceTeacher;
