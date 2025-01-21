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
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

import {
  studentEditSchema,
  studentSchema,
} from "../../../../Components/yupSchema/studentSchema";
import { useState } from "react";
import { baseAPI } from "../../../../environment";

export default function AttendanceStudentList() {
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [classes, setClasses] = useState([]);
  // Define initial form field values
  const initialValues = {
    name: "",
    email: "",
    student_class: "",
    age: "",
    gender: "",
    guardian: "",
    guardian_phone: "",
    password: "",
    confirm_password: "",
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete student?")) {
      console.log("Delete", id);
      axios
        .delete(`${baseAPI}/student/delete/${id}`)
        .then((res) => {
          console.log("Student delete response", res);

          alert("Student deleted successfully");
          fetchStudents();
        })
        .catch((err) => {
          console.log("Error in deleting student", err);

          alert("Failed to delete student");
        });
    }
  };
  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    formik.resetForm();
  };

  const handleEdit = (id) => {
    setEdit(true);
    setEditId(id);
    const filteredStudent = students.filter((x) => x._id === id);
    console.log("Filtered Student ", filteredStudent);
    const student = filteredStudent[0];

    formik.setFieldValue("name", filteredStudent[0].name);
    formik.setFieldValue("email", filteredStudent[0].email);
    formik.setFieldValue(
      "student_class",
      student.student_class ? student.student_class._id : "" // Check if student_class exists
    );
    formik.setFieldValue("age", filteredStudent[0].age);
    formik.setFieldValue("gender", filteredStudent[0].gender || "");
    formik.setFieldValue("guardian", filteredStudent[0].guardian);
    formik.setFieldValue("guardian_phone", filteredStudent[0].guardian_phone);
  };

  // Formik setup for form state management, validation, and submission
  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: edit ? studentEditSchema : studentSchema, // Attach Yup schema for validation
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        const data = {
          name: values.name,
          email: values.email,
          student_class: values.student_class,
          age: values.age,
          gender: values.gender,
          guardian: values.guardian,
          guardian_phone: values.guardian_phone,
        };

        if (values.password) {
          const data = { password: values.password };
        }

        axios
          .patch(
            `https://erisn-api.onrender.com/api/student/update/${editId}`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("updated Students data : ", res.data.data);
            alert(`Student updated successfully!`);

            resetForm(); // Clear the form
            fetchStudents();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error updating Student");
          });
      } else {
        // Prepare the data to be sent to the API
        const data = {
          name: values.name,
          email: values.email,
          student_class: values.student_class,
          age: values.age,
          gender: values.gender,
          guardian: values.guardian,
          guardian_phone: values.guardian_phone,
          password: values.password,
        };

        // API call to register the user
        axios
          .post(
            `https://erisn-api.onrender.com/api/student/register`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("Registered Students data : ", res.data.data);
            alert(`Student registered successfully!`);

            resetForm();
            fetchStudents();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error registering Student");
          });
      }
    },
  });

  const fetchClasses = () => {
    axios
      .get(`${baseAPI}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching class");
      });
  };

  const [params, setParams] = useState({});
  const handleClass = (e) => {
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

  const [students, setStudents] = useState([]);
  const fetchStudents = () => {
    axios
      .get(`${baseAPI}/student/fetch-with-query`, { params })
      .then((res) => {
        console.log("Response Students", res.data.students); // Inspect the response
        setStudents(res.data.students);
      })
      .catch((e) => {
        console.log("Error in fetching class");
      });
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
            label="search"
            value={params.search ? params.search : ""}
            onChange={(e) => {
              handleSearch(e);
            }}
            // onBlur={formik.handleBlur}
          />

          <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
            <InputLabel id="student_class">Student Class</InputLabel>
            <Select
              // value={formik.values.student_class}
              label="Student Class"
              value={params.student_class ? params.student_class : ""}
              // name="student_class"
              onChange={(e) => {
                handleClass(e);
              }}
            >
              <MenuItem value="">Select Class</MenuItem>
              {classes &&
                classes.map((x) => {
                  return (
                    <MenuItem key={x._id} value={x._id}>
                      {x.class_text} ({x.class_num})
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>

        {/* Table Section */}
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
                  <TableCell>{student.class}</TableCell>
                  <TableCell>"Percentage"</TableCell>
                  <TableCell>"View"</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
