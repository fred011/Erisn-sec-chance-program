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
  IconButton,
} from "@mui/material";
import axios from "axios";

import {
  teacherEditSchema,
  teacherSchema,
} from "../../../../Components/yupSchema/teacherSchema";
import { useState } from "react";
import { baseAPI } from "../../../../environment";

export default function Teachers() {
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [classes, setClasses] = useState([]);
  // Define initial form field values
  const initialValues = {
    name: "",
    email: "",
    qualification: "",
    age: "",
    gender: "",

    phone_number: "",
    password: "",
    confirm_password: "",
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete teacher?")) {
      console.log("Delete", id);
      axios
        .delete(`${baseAPI}/teacher/delete/${id}`)
        .then((res) => {
          console.log("Teacher delete response", res);

          alert("Teacher deleted successfully");
          fetchTeachers();
        })
        .catch((err) => {
          console.log("Error in deleting teacher", err);

          alert("Failed to delete teacher");
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
    const filteredTeacher = teachers.filter((x) => x._id === id);
    console.log("Filtered Teacher ", filteredTeacher);

    formik.setFieldValue("name", filteredTeacher[0].name);
    formik.setFieldValue("email", filteredTeacher[0].email);
    formik.setFieldValue("qualification", filteredTeacher[0].qualification);
    formik.setFieldValue("age", filteredTeacher[0].age);
    formik.setFieldValue("gender", filteredTeacher[0].gender);
    formik.setFieldValue("guardian", filteredTeacher[0].guardian);
    formik.setFieldValue("phone_number", filteredTeacher[0].phone_number);
  };

  // Formik setup for form state management, validation, and submission
  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: edit ? teacherEditSchema : teacherSchema, // Attach Yup schema for validation
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        const data = {
          name: values.name,
          email: values.email,
          qualification: values.qualification,
          age: values.age,
          gender: values.gender,

          phone_number: values.phone_number,
        };

        if (values.password) {
          const data = { password: values.password };
        }

        axios
          .patch(
            `${baseAPI}/teacher/update/${editId}`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("updated Teachers data : ", res.data.data);
            alert(`Teacher updated successfully!`);

            resetForm(); // Clear the form
            fetchTeachers();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error updating Teacher");
          });
      } else {
        // Prepare the data to be sent to the API
        const data = {
          name: values.name,
          email: values.email,
          qualification: values.qualification,
          age: values.age,
          gender: values.gender,

          phone_number: values.phone_number,
          password: values.password,
        };

        // API call to register the user
        axios
          .post(
            `${baseAPI}/teacher/register`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("Registered Teachers data : ", res.data.data);
            alert(`Teacher registered successfully!`);

            resetForm();
            fetchTeachers();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error registering Teacher");
          });
      }
    },
  });

  const [params, setParams] = useState({});

  const handleSearch = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: e.target.value || undefined,
    }));
  };

  const [teachers, setTeachers] = useState([]);
  const fetchTeachers = () => {
    axios
      .get(`${baseAPI}/teacher/fetch-with-query`, { params })
      .then((res) => {
        setTeachers(res.data.teachers);
        console.log("Response Teachers", res);
      })
      .catch((e) => {
        console.log("Error in fetching class");
      });
  };

  React.useEffect(() => {
    fetchTeachers();
  }, [params]);
  return (
    <>
      <Box
        component={"div"}
        sx={{
          height: "100%",
          paddingTop: "20px", // Increased padding for a cleaner look
          paddingBottom: "20px",
          backgroundColor: "#f4f6f9", // Light background color for the section
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "500",
            marginBottom: "20px", // Add spacing below the title
            color: "#333", // Darker color for the heading
          }}
        >
          Teachers
        </Typography>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2 }, // Add margin to child elements for spacing
            display: "flex",
            flexDirection: "column",
            width: "60vw",
            minWidth: "230px",
            margin: "auto",
            backgroundColor: "#fff", // White background for the form
            borderRadius: "8px", // Rounded corners for the form
            padding: "20px", // Padding inside the form
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow for form elevation
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
                marginBottom: "15px", // Add spacing below the title
                color: "#1976d2", // Highlight edit text with blue
              }}
            >
              Edit Teacher
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "500",
                marginBottom: "15px", // Add spacing below the title
                color: "#1976d2", // Highlight add text with blue
              }}
            >
              Add Teacher
            </Typography>
          )}

          {/* Name Input */}
          <TextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "15px" }} // Add margin for spacing between fields
          />
          {formik.touched.name && formik.errors.name && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
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
            sx={{ marginBottom: "15px" }}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
              {formik.errors.email}
            </Typography>
          )}

          {/* Qualification Input */}
          <TextField
            name="qualification"
            label="Qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "15px" }}
          />
          {formik.touched.qualification && formik.errors.qualification && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
              {formik.errors.qualification}
            </Typography>
          )}

          {/* Age Input */}
          <TextField
            name="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "15px" }}
          />
          {formik.touched.age && formik.errors.age && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
              {formik.errors.age}
            </Typography>
          )}

          {/* Gender Input */}
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
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
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
              {formik.errors.gender}
            </Typography>
          )}

          {/* Phone Input */}
          <TextField
            name="phone_number"
            label="Phone Number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "15px" }}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
              {formik.errors.phone_number}
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
            sx={{ marginBottom: "15px" }}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: "15px" }}
            >
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
            sx={{ marginBottom: "15px" }}
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <Typography
                color="error"
                variant="body2"
                sx={{ marginBottom: "15px" }}
              >
                {formik.errors.confirm_password}
              </Typography>
            )}

          {/* Submit Button */}
          <Button
            sx={{ width: "120px", marginBottom: "15px" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>

          {edit && (
            <Button
              sx={{ width: "120px", marginBottom: "15px" }}
              onClick={() => cancelEdit()}
              type="button"
              variant="outlined"
            >
              Cancel
            </Button>
          )}
        </Box>

        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <TextField
            label="Search"
            value={params.search ? params.search : ""}
            onChange={(e) => {
              handleSearch(e);
            }}
            sx={{ width: "300px" }} // Set a width for the search input
          />
        </Box>

        {/* Table for Teachers */}
        <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="teacher table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  <strong>Name</strong>
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  <strong>Qualification</strong>
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  <strong>Age</strong>
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  <strong>Phone Number</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers &&
                teachers.map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.qualification}</TableCell>
                    <TableCell>{teacher.age}</TableCell>
                    <TableCell>{teacher.gender}</TableCell>
                    <TableCell>{teacher.phone_number}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleEdit(teacher._id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDelete(teacher._id);
                        }}
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
