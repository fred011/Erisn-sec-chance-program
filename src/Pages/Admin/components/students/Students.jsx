// import React, { useState } from "react";
// import { TextField, Button, Grid, Typography, Container } from "@mui/material";

// const Students = () => {
//   const [student, setStudent] = useState({
//     fullName: "",
//     email: "",
//     gender: "",
//     age: "",
//     guardian: "",
//     guardianPhone: "",
//     password: "",
//   });

//   const [studentsList, setStudentsList] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudent({ ...student, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStudentsList([...studentsList, student]);
//     setStudent({
//       fullName: "",
//       email: "",
//       gender: "",
//       age: "",
//       guardian: "",
//       guardianPhone: "",
//       password: "",
//     });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Register Student
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               label="Full Name"
//               name="fullName"
//               value={student.fullName}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               name="email"
//               value={student.email}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={student.gender}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Age"
//               name="age"
//               value={student.age}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Guardian"
//               name="guardian"
//               value={student.guardian}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Guardian Phone"
//               name="guardianPhone"
//               value={student.guardianPhone}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               value={student.password}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Register
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
//         Registered Students
//       </Typography>
//       <Grid container spacing={3}>
//         {studentsList.map((student, index) => (
//           <Grid item xs={12} key={index}>
//             <Typography variant="body1">
//               {`Full Name: ${student.fullName}, Email: ${student.email}, Gender: ${student.gender}, Age: ${student.age}, Guardian: ${student.guardian}, Guardian Phone: ${student.guardianPhone}`}
//             </Typography>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Students;

/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import {
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

import { studentSchema } from "../../../../Components/yupSchema/studentSchema";
import { useState } from "react";
import { baseAPI } from "../../../../environment";

export default function Students() {
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

  // Formik setup for form state management, validation, and submission
  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: studentSchema, // Attach Yup schema for validation
    onSubmit: (values, { resetForm }) => {
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
          alert(`Student registered successfully!`);

          resetForm(); // Clear the form
          // Navigate to the respective role dashboard
        })
        .catch((err) => {
          // Handle errors
          alert(err.response?.data?.error || "Error registering Student");
        });
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

  React.useEffect(() => {
    fetchClasses();
  }, []);
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
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          Students
        </Typography>
        {/* Name Input */}
        <TextField
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p style={{ color: "red" }}>{formik.errors.name}</p> // Show error if name is invalid
        )}

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
        {/* Student class Input */}

        <FormControl fullWidth>
          <InputLabel id="student_class">Student Class</InputLabel>
          <Select
            labelId="student_class"
            id="student_class"
            value={formik.values.student_class}
            label="Student Class"
            name="student_class"
            onChange={formik.handleChange}
          >
            {/* <MenuItem value={""}>Select Class</MenuItem> */}
            {classes &&
              classes.map((x) => {
                return (
                  <MenuItem key={x._id} value={x._id}>
                    {x.class_text} ({x.class_num})
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        {formik.touched.student_class && formik.errors.student_class && (
          <p style={{ color: "red" }}>{formik.errors.student_class}</p> // Show error if name is invalid
        )}
        {/* Age Input */}
        <TextField
          name="age"
          label="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age && (
          <p style={{ color: "red" }}>{formik.errors.age}</p> // Show error if name is invalid
        )}
        {/* Gender Input */}
        <FormControl fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            value={formik.values.gender}
            label="Gender"
            name="gender"
            onChange={formik.handleChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
        {formik.touched.gender && formik.errors.gender && (
          <p style={{ color: "red" }}>{formik.errors.gender}</p> // Show error if name is invalid
        )}
        {/* Guardian Input */}
        <TextField
          name="guardian"
          label="Guardian"
          value={formik.values.guardian}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.guardian && formik.errors.guardian && (
          <p style={{ color: "red" }}>{formik.errors.guardian}</p> // Show error if name is invalid
        )}
        {/* Guardian phone Input */}
        <TextField
          name="guardian_phone"
          label="Guardian Phone Number"
          value={formik.values.guardian_phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.guardian_phone && formik.errors.guardian_phone && (
          <p style={{ color: "red" }}>{formik.errors.guardian_phone}</p> // Show error if name is invalid
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

        {/* Confirm Password Input */}
        <TextField
          type="password"
          name="confirm_password"
          label="Confirm Password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <p style={{ color: "red" }}>{formik.errors.confirm_password}</p>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </>
  );
}
