/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../Components/yupSchema/loginSchema";
import {
  Box,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  CircularProgress,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { baseAPI } from "../../../environment";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: { email: "", password: "", role: "" },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true); // Show loader
      const data = { email: values.email, password: values.password };

      // First, attempt login
      axios
        .post(`${baseAPI}/${values.role}/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          // Save user data after successful login
          login({ ...res.data, role: values.role });

          // Now verify token
          const token = res.data.token; // Assuming the token is returned in response data
          axios
            .post(
              `${baseAPI}/verify-token`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((verificationResponse) => {
              console.log(
                "Token verified successfully",
                verificationResponse.data
              );
              console.log("Logged in successfully");
              alert("Logged in successfully");
              // Proceed to the user's role page after successful verification
              resetForm();
              navigate(`/${values.role}`);
            })
            .catch((verificationError) => {
              console.error("Token verification failed:", verificationError);
              alert("Token verification failed. Please try again.");
            });
        })
        .catch((err) => {
          console.log("Failed to login", err);
          const errorMessage =
            err.response?.data?.error || err.message || "Error logging in";
          alert(errorMessage);
        })
        .finally(() => setLoading(false)); // Hide loader
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
        marginTop: "50px",
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <h1>Login</h1>

      <TextField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <p style={{ color: "red" }}>{formik.errors.email}</p>
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
        <p style={{ color: "red" }}>{formik.errors.password}</p>
      )}

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
        <p style={{ color: "red" }}>{formik.errors.role}</p>
      )}

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Log In"}
      </Button>
    </Box>
  );
}
