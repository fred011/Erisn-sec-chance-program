/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, useFormik } from "formik";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
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

export default function Students() {
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
        console.log("Error in fetching students");
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
        sx={{
          height: "100%",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: "#f4f6f8", // Light background color for the page
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "500",
            color: "#1976d2", // Primary color
            marginBottom: "20px",
          }}
        >
          Students
        </Typography>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2 }, // Margin between form elements
            display: "flex",
            flexDirection: "column",
            width: "60vw",
            minWidth: "250px",
            margin: "auto",
            marginTop: "10px",
            backgroundColor: "#fff", // White background for form
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 2, // Adds a slight shadow for visual appeal
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {edit ? (
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Edit Student
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Add Student
            </Typography>
          )}

          {/* Name Input */}
          <TextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.name && formik.errors.name && (
            <Typography color="error" variant="body2">
              {formik.errors.name}
            </Typography>
          )}

          {/* Email Input */}
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography color="error" variant="body2">
              {formik.errors.email}
            </Typography>
          )}

          {/* Student class Input */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="student_class">Student Class</InputLabel>
            <Select
              labelId="student_class"
              id="student_class"
              value={formik.values.student_class}
              label="Student Class"
              name="student_class"
              onChange={formik.handleChange}
            >
              {classes &&
                classes.map((x) => (
                  <MenuItem key={x._id} value={x._id}>
                    {x.class_text} ({x.class_num})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {formik.touched.student_class && formik.errors.student_class && (
            <Typography color="error" variant="body2">
              {formik.errors.student_class}
            </Typography>
          )}

          {/* Age Input */}
          <TextField
            name="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.age && formik.errors.age && (
            <Typography color="error" variant="body2">
              {formik.errors.age}
            </Typography>
          )}

          {/* Gender Input */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={formik.values.gender}
              label="Gender"
              name="gender"
              onChange={formik.handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.gender && formik.errors.gender && (
            <Typography color="error" variant="body2">
              {formik.errors.gender}
            </Typography>
          )}

          {/* Guardian Input */}
          <TextField
            name="guardian"
            label="Guardian"
            value={formik.values.guardian}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.guardian && formik.errors.guardian && (
            <Typography color="error" variant="body2">
              {formik.errors.guardian}
            </Typography>
          )}

          {/* Guardian Phone Input */}
          <TextField
            name="guardian_phone"
            label="Guardian Phone Number"
            value={formik.values.guardian_phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.guardian_phone && formik.errors.guardian_phone && (
            <Typography color="error" variant="body2">
              {formik.errors.guardian_phone}
            </Typography>
          )}

          {/* Password Input */}
          <TextField
            type="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography color="error" variant="body2">
              {formik.errors.password}
            </Typography>
          )}

          {/* Confirm Password Input */}
          <TextField
            type="password"
            name="confirm_password"
            label="Confirm Password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: 2 }}
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <Typography color="error" variant="body2">
                {formik.errors.confirm_password}
              </Typography>
            )}

          {/* Submit Button */}
          <Button
            sx={{ width: "120px", marginBottom: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          {edit && (
            <Button
              sx={{ width: "120px", marginBottom: 2 }}
              onClick={() => cancelEdit()}
              type="button"
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          )}
        </Box>

        {/* Search and Class Filter Section */}
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
            sx={{ marginRight: "10px", width: "300px" }}
          />

          <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
            <InputLabel id="student_class">Student Class</InputLabel>
            <Select
              labelId="student_class"
              id="student_class"
              value={params.student_class || ""}
              onChange={handleClass}
            >
              <MenuItem value="">Select Class</MenuItem>
              {classes &&
                classes.map((x) => (
                  <MenuItem key={x._id} value={x._id}>
                    {x.class_text} ({x.class_num})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        {/* Students Table Section */}
        <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Guardian</TableCell>
                <TableCell>Guardian Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {student.student_class
                      ? student.student_class.class_text
                      : "Not Assigned"}
                  </TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.guardian}</TableCell>
                  <TableCell>{student.guardian_phone}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(student._id)}
                      startIcon={<EditIcon />}
                      sx={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(student._id)}
                      startIcon={<DeleteIcon />}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
