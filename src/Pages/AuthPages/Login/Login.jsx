/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../Components/yupSchema/loginSchema";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `https://erisn-api.onrender.com/api/${values.role}/login`,
          {
            email: values.email,
            password: values.password,
          },
          { withCredentials: true }
        );

        const { token, user } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          login(user); // Update context with user info
          resetForm();
          alert(`${values.role} login successful!`);
          navigate(`/${values.role}`);
        } else {
          throw new Error("Invalid login response.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(error.response?.data?.error || "Login failed. Please try again.");
      }
    },
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 }, // Add margin to child elements
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          minWidth: "230px",
          margin: "auto",
          marginTop: "50px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit} // Attach Formik's submit handler
      >
        <h1>Login</h1>

        {/* Email Input */}
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

        {/* Password Input */}
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
          <p style={{ color: "red" }}>{formik.errors.role}</p>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained">
          Log In
        </Button>
        <p>
          Dont have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "blue" }}
          >
            Register
          </Link>
        </p>
      </Box>
    </>
  );
}
