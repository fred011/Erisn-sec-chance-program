/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { loginSchema } from "../../../Components/yupSchema/loginSchema"; // Import validation schema
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  // const { login } = React.useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
    role: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      axios
        .post(`https://erisn-api.onrender.com/api/${values.role}/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          const token = res.data.token; // Ensure this matches the API response
          const user = res.data.user;

          if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            // login(user); // Update context state
            resetForm();
            navigate(`/${user.role.toLowerCase()}`);
          }
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
        Don’t have an account?{" "}
        <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
          Register
        </Link>
      </p>
    </Box>
  );
}
