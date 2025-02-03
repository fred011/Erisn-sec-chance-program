/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress, // Import the loader
} from "@mui/material";

import { styled } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import Attendee from "./Attendee";
import { useState } from "react";
import { baseAPI } from "../../../../environment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

export default function AttendanceStudentList() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false); // Loader state

  // Fetch attendance for all students
  const fetchAttendanceForStudents = async (studentsList) => {
    const attendancePromises = studentsList.map((student) =>
      fetchAttendanceForStudent(student._id)
    );
    const results = await Promise.all(attendancePromises);
    const updatedAttendanceData = {};
    results.forEach(({ studentId, attendancePercentage }) => {
      updatedAttendanceData[studentId] = attendancePercentage;
    });
    setAttendanceData(updatedAttendanceData);
    console.log(updatedAttendanceData);
  };

  // Fetch attendance for a specific student
  const fetchAttendanceForStudent = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseAPI}/attendance/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const attendanceRecords = response.data;
      const totalClasses = attendanceRecords.length;
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "present"
      ).length;
      const attendancePercentage =
        totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;

      return { studentId, attendancePercentage };
    } catch (error) {
      console.error(
        `Error fetching attendance for student ${studentId}`,
        error
      );
      return { studentId, attendancePercentage: 0 };
    }
  };

  // Fetch all available classes
  const fetchClasses = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseAPI}/class/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data.data);
    } catch (error) {
      console.error(
        "Error in fetching classes",
        error.response || error.message
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch students based on parameters (including selected class)
  const fetchStudents = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseAPI}/student/fetch-with-query`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.students);
      fetchAttendanceForStudents(res.data.students);
    } catch (error) {
      console.error(
        "Error in fetching students",
        error.response || error.message
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle class selection
  const handleClass = (e) => {
    const selectedClassId = e.target.value;
    setParams((prevParams) => ({
      ...prevParams,
      student_class: selectedClassId || undefined,
    }));
  };

  // Handle search input change
  const handleSearch = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: e.target.value || undefined,
    }));
  };

  React.useEffect(() => {
    fetchClasses();
  }, []);

  React.useEffect(() => {
    fetchStudents();
  }, [params]);

  return (
    <>
      <Box
        sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: 2 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "500",
            marginBottom: 4,
            color: "#1976d2",
            textTransform: "uppercase",
          }}
        >
          Students Attendance
        </Typography>

        {loading ? ( // Show loader while fetching data
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Filters Section */}
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel id="student_class" sx={{ color: "#1976d2" }}>
                  Select Class
                </InputLabel>
                <Select
                  labelId="student_class"
                  value={params.student_class || ""}
                  onChange={handleClass}
                >
                  <MenuItem value="">All Classes</MenuItem>
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.class_text} ({cls.class_num})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Students Table Section */}
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Gender
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Guardian Phone
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Class
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Attendance %
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.guardian_phone}</TableCell>
                        <TableCell>
                          {student.student_class
                            ? student.student_class.class_text
                            : "Not Assigned"}
                        </TableCell>
                        <TableCell>
                          {attendanceData[student._id] !== undefined
                            ? `${attendanceData[student._id].toFixed(2)}%`
                            : "No Data"}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/admin/attendance/${student._id}`}
                            style={{
                              textDecoration: "none",
                              color: "#1976d2",
                              fontWeight: "bold",
                            }}
                          >
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </>
  );
}
