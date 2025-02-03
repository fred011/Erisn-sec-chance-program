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
import CircularProgress from "@mui/material/CircularProgress"; // Import the CircularProgress component

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
  const [loading, setLoading] = useState(false); // State for loading indicator

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
    if (confirm("Are you sure you want to delete this student?")) {
      const token = localStorage.getItem("token"); // Get token for authentication
      setLoading(true); // Start loading before making API call
      axios
        .delete(`${baseAPI}/student/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        })
        .then((res) => {
          console.log("Student delete response", res);
          alert("Student deleted successfully");
          fetchStudents();
        })
        .catch((err) => {
          console.log("Error in deleting student", err);
          alert(err.response?.data?.error || "Failed to delete student");
        })
        .finally(() => {
          setLoading(false); // Stop loading after API call is done
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
    const student = filteredStudent[0];

    formik.setFieldValue("name", student.name);
    formik.setFieldValue("email", student.email);
    formik.setFieldValue("student_class", student.student_class?._id || "");
    formik.setFieldValue("age", student.age);
    formik.setFieldValue("gender", student.gender || "");
    formik.setFieldValue("guardian", student.guardian);
    formik.setFieldValue("guardian_phone", student.guardian_phone);
  };

  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: edit ? studentEditSchema : studentSchema, // Attach Yup schema for validation
    onSubmit: (values, { resetForm }) => {
      const data = {
        name: values.name,
        email: values.email,
        student_class: values.student_class,
        age: values.age,
        gender: values.gender,
        guardian: values.guardian,
        guardian_phone: values.guardian_phone,
      };

      // Add password only if it's not empty during editing
      if (!edit && values.password) {
        data.password = values.password;
      }

      const token = localStorage.getItem("token"); // Get token for authentication
      setLoading(true); // Start loading before making API call

      if (edit) {
        axios
          .patch(`${baseAPI}/student/update/${editId}`, data, {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request headers
            },
          })
          .then((res) => {
            console.log("Updated student data: ", res.data.data);
            alert("Student updated successfully!");
            resetForm();
            fetchStudents();
          })
          .catch((err) => {
            console.log("Error in updating student", err);
            alert(err.response?.data?.error || "Failed to update student");
          })
          .finally(() => {
            setLoading(false); // Stop loading after API call is done
          });
      } else {
        axios
          .post(`${baseAPI}/student/register`, data, {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request headers
            },
          })
          .then((res) => {
            console.log("Registered student data: ", res.data.data);
            alert("Student registered successfully!");
            resetForm();
            fetchStudents();
          })
          .catch((err) => {
            console.log("Error in registering student", err);
            alert(err.response?.data?.error || "Failed to register student");
          })
          .finally(() => {
            setLoading(false); // Stop loading after API call is done
          });
      }
    },
  });

  const fetchClasses = () => {
    const token = localStorage.getItem("token"); // Add token for authentication
    setLoading(true); // Start loading before making API call
    axios
      .get(`${baseAPI}/class/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the request headers
        },
      })
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching class", e);
      })
      .finally(() => {
        setLoading(false); // Stop loading after API call is done
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
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    setLoading(true); // Start loading before making API call

    axios
      .get(`${baseAPI}/student/fetch-with-query`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((res) => {
        console.log("Response Students", res.data.students); // Inspect the response
        setStudents(res.data.students);
      })
      .catch((e) => {
        console.log("Error in fetching students", e.response || e.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading after API call is done
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

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

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

          {/* Guardian Name */}
          <TextField
            name="guardian"
            label="Guardian Name"
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

          {/* Guardian Phone */}
          <TextField
            name="guardian_phone"
            label="Guardian Phone"
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

          {!edit && (
            <>
              {/* Password Input */}
              <TextField
                name="password"
                type="password"
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

              {/* Confirm Password */}
              <TextField
                name="confirm_password"
                type="password"
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
            </>
          )}

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "48%" }}
              disabled={loading} // Disable the button while loading
            >
              {edit ? "Update Student" : "Add Student"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: "48%" }}
              onClick={cancelEdit}
              disabled={loading} // Disable the button while loading
            >
              Cancel
            </Button>
          </Box>
        </Box>

        {/* Table to show students */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.student_class?.class_text}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(student._id)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(student._id)}
                      startIcon={<DeleteIcon />}
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
