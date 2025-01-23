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
  Grid2,
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
  const [selectedClass, setSelectedClass] = useState(null);

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
  };

  const fetchAttendanceForStudent = async (studentId) => {
    try {
      const response = await axios.get(`${baseAPI}/attendance/${studentId}`);
      const attendanceRecords = response.data;
      const totalClasses = attendanceRecords.length;
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length;
      const attendancePercentage =
        totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;
      return { studentId, attendancePercentage };
    } catch (error) {
      console.error(
        `Error fetching attendance for student ${studentId}`,
        error.response || error.message
      );
      return { studentId, attendancePercentage: 0 };
    }
  };

  const fetchClasses = () => {
    axios
      .get(`${baseAPI}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.error("Error in fetching classes", e.response || e.message);
      });
  };

  const fetchStudents = () => {
    axios
      .get(`${baseAPI}/student/fetch-with-query`, { params })
      .then((res) => {
        setStudents(res.data.students);
        fetchAttendanceForStudents(res.data.students);
      })
      .catch((e) => {
        console.error("Error in fetching students", e.response || e.message);
      });
  };

  const handleClass = (e) => {
    setSelectedClass(e.target.value);
    setParams((prevParams) => ({
      ...prevParams,
      student_class: e.target.value || undefined,
    }));
  };

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
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "500", marginBottom: 4 }}
      >
        Students Attendance
      </Typography>

      <Grid2 container spacing={3}>
        {/* Filters Section */}
        <Grid2 item xs={12} md={4}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Filter Students
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Search by Name"
                value={params.search || ""}
                onChange={handleSearch}
                variant="outlined"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="student_class">Select Class</InputLabel>
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
              {selectedClass && <Attendee classId={selectedClass} />}
            </Box>
          </Item>
        </Grid2>

        {/* Students Table Section */}
        <Grid2 item xs={12} md={8}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Students List
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Guardian Phone</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Attendance %</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <TableRow
                        key={student._id}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "#f9f9f9",
                          },
                        }}
                      >
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
                            to={`/school/attendance/${student._id}`}
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
          </Item>
        </Grid2>
      </Grid2>
    </Box>
  );
}
