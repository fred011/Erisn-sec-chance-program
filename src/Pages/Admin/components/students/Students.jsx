import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";

const Students = () => {
  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    gender: "",
    age: "",
    guardian: "",
    guardianPhone: "",
    password: "",
  });

  const [studentsList, setStudentsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudentsList([...studentsList, student]);
    setStudent({
      fullName: "",
      email: "",
      gender: "",
      age: "",
      guardian: "",
      guardianPhone: "",
      password: "",
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Register Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="fullName"
              value={student.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={student.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              name="gender"
              value={student.gender}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="age"
              value={student.age}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Guardian"
              name="guardian"
              value={student.guardian}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Guardian Phone"
              name="guardianPhone"
              value={student.guardianPhone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={student.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Registered Students
      </Typography>
      <Grid container spacing={3}>
        {studentsList.map((student, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="body1">
              {`Full Name: ${student.fullName}, Email: ${student.email}, Gender: ${student.gender}, Age: ${student.age}, Guardian: ${student.guardian}, Guardian Phone: ${student.guardianPhone}`}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Students;
