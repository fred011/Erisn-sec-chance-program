/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { registerSchema } from "../../../Components/yupSchema/registerSchema"; // Your validation schema
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Register() {
  const navigate = useNavigate(); // Initialize navigate function

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "", // This will hold the selected role (admin, teacher, student)
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Register submit values", values);

      // Prepare data for the request
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role, // Send the selected role
      };

      axios
        .post(
          "https://erisn-api.onrender.com/api/" + values.role + "/register",
          data,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(`${values.role} registered:`, res.data);
          alert(
            `${
              values.role.charAt(0).toUpperCase() + values.role.slice(1)
            } registered successfully!`
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
            "Error registering " + values.role + ":",
            err.response?.data || err.message
          );
          alert(err.response?.data?.error || "Error registering user");
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
        Register
      </h1>
      <TextField
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.name}
        </p>
      )}
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
      <TextField
        type="password"
        name="confirm_password"
        label="Confirm Password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.confirm_password && formik.errors.confirm_password && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {formik.errors.confirm_password}
        </p>
      )}

      {/* Role Selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Register As:</FormLabel>
        <RadioGroup
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {/* <FormControlLabel value="admin" control={<Radio />} label="Admin" /> */}
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
        Register
      </Button>
      <p>
        Already have an account? <a href="/login">Log In Here.</a>
      </p>
    </Box>
  );
}
