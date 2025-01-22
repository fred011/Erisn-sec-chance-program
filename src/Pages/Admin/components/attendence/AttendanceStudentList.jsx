/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, useFormik } from "formik";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

import {
  studentEditSchema,
  studentSchema,
} from "../../../../Components/yupSchema/studentSchema";
import { useState } from "react";
import { baseAPI } from "../../../../environment";
import Attendee from "./Attendee";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...(theme.palette.mode === "dark" && {
    backgroundColor: "#1A2027",
  }),
}));

export default function AttendanceStudentList() {
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

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
    <>
      <Box
        component={"div"}
        sx={{ height: "100%", paddingTop: "5px", paddingBottom: "5px" }}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          Students Attendance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Item>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <TextField
                  label="Search"
                  value={params.search || ""}
                  onChange={handleSearch}
                />

                <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
                  <InputLabel id="student_class">Student Class</InputLabel>
                  <Select
                    label="Student Class"
                    value={params.student_class || ""}
                    onChange={handleClass}
                  >
                    <MenuItem value="">Select Class</MenuItem>
                    {classes.map((x) => (
                      <MenuItem key={x._id} value={x._id}>
                        {x.class_text} ({x.class_num})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>{selectedClass && <Attendee classId={selectedClass} />}</Box>
            </Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>
              <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Guardian Phone</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Percentage</TableCell>
                      <TableCell>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
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
                          <Link to={`/school/attendance/${student._id}`}>
                            Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
