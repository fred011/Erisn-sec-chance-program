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
    <form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <TextField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <FormControl>
        <FormLabel>Log in as:</FormLabel>
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
      <Button type="submit" variant="contained">
        Login
      </Button>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
