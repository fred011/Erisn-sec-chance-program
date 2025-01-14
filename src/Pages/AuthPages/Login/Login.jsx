/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
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
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "", role: "" },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      const data = { email: values.email, password: values.password };

      axios
        .post(`https://erisn-api.onrender.com/api/${values.role}/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          login({ ...res.data, role: values.role });
          alert("Logged in successfully");
          resetForm();
          navigate(`/${values.role}`);
        })
        .catch((err) => {
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

      <Button type="submit" variant="contained">
        Log In
      </Button>
      <p>
        Dont have an account?{" "}
        <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
          Register
        </Link>
      </p>
    </Box>
  );
}
