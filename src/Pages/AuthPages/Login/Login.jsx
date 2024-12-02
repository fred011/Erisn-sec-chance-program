/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { loginSchema } from "../../../Components/yupSchema/loginSchema"; // Your validation schema for login
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    role: "", // This will hold the selected role (admin, teacher, student)
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Login submit values", values);

      // Prepare data for the request
      const data = {
        email: values.email,
        password: values.password,
      };

      // Make the request to the appropriate API endpoint based on role
      axios
        .post(`https://erisn-api.onrender.com/api/${values.role}/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(`${values.role} logged in:`, res.data);
          alert(
            `${
              values.role.charAt(0).toUpperCase() + values.role.slice(1)
            } login successful!`
          );
          resetForm(); // Clear the form
          if (res.data.role === "admin") {
            navigate("/admin");
          } else if (res.data.role === "teacher") {
            navigate("/teacher");
          } else {
            navigate("/student");
          }
        })
        .catch((err) => {
          console.error(
            `Error logging in ${values.role}:`,
            err.response?.data || err.message
          );
          alert(err.response?.data?.error || "Error logging in");
        });
    },
  });

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        width: "60vw",
        minWidth: "230px",
        margin: "auto",
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit} // use formik's handleSubmit
    >
      <h1 style={{ fontSize: "42px", fontWeight: "700", color: "#363636" }}>
        Login
      </h1>
      <TextField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.email}
        </p>
      )}
      <TextField
        type="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.password}
        </p>
      )}

      {/* Role Selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Log In As:</FormLabel>
        <RadioGroup
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel
            value="teacher"
            control={<Radio />}
            label="Teacher"
          />
          <FormControlLabel
            value="student"
            control={<Radio />}
            label="Student"
          />
        </RadioGroup>
      </FormControl>
      {formik.touched.role && formik.errors.role && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.role}
        </p>
      )}

      <Button type="submit" variant="contained">
        Log In
      </Button>
      <p>
        Don`t` have an account? <a href="/register">Register Here.</a>
      </p>
    </Box>
  );
}
