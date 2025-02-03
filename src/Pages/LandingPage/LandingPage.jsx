/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Link } from "react-scroll";
import {
  Button,
  Container,
  TextField,
  Grid2,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import logo from "../../Images/ERISN LOGO.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t1ikomh", "template_yu7c0hs", form.current, {
        publicKey: "7WqT1OXOpLHZLPDPH",
      })
      .then(
        () => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.log("Failed to send message.", error.text);
          alert("Failed to send message.");
        }
      );
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ backgroundColor: "#dedede", minHeight: "100vh" }}>
      <header>
        <Container
          maxWidth="xl"
          sx={{
            padding: "16px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="/" className="logo">
            <img src={logo} alt="Erisn Logo" style={{ height: "50px" }} />
          </a>
          <nav>
            <Link
              to="/"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              href="/"
              style={{ margin: "0 16px", cursor: "pointer" }}
            >
              Home
            </Link>
            <Link
              to="features"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              href="#features"
              style={{ margin: "0 16px", cursor: "pointer" }}
            >
              Key Features
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              href="#contact"
              style={{ margin: "0 16px", cursor: "pointer" }}
            >
              Contact us
            </Link>
          </nav>
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Log In
          </Button>
        </Container>
      </header>

      <section
        id="hero"
        style={{
          background: "#003366",
          color: "#fff",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>
            Welcome to the Erisn Empowerment Program’s
          </Typography>
          <Typography variant="h5" paragraph>
            Students Management System
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSignIn}>
            Get Started
          </Button>
        </Container>
      </section>

      <section
        id="features"
        className="key-features"
        style={{ padding: "60px 0", textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Key Features
        </Typography>
        <Grid2 container spacing={4} justifyContent="center">
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <Typography variant="h6">Student Records</Typography>
              <img src="" alt="Student Records" />
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <Typography variant="h6">Admission Management</Typography>
              <img src="" alt="Admission Management" />
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <Typography variant="h6">Fee Management</Typography>
              <img src="" alt="Fee Management" />
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <Typography variant="h6">Students` Behavior Tracking</Typography>
              <img src="" alt="Students' Behavior Tracking" />
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <Typography variant="h6">Library Management</Typography>
              <img src="" alt="Library Management" />
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <Box
              sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <Typography variant="h6">Alerts and Notifications</Typography>
              <img src="" alt="Alerts and Notifications" />
            </Box>
          </Grid2>
        </Grid2>
      </section>

      <section
        id="contact"
        className="contact"
        style={{
          padding: "60px 0",
          background: "#f4f6f9",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
            <form ref={form} onSubmit={sendEmail}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                name="user_name"
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                name="user_email"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Your Query"
                variant="outlined"
                margin="normal"
                name="user_message"
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Send Query
              </Button>
            </form>
          </Box>
        </Container>
      </section>

      <footer
        className="footer"
        style={{
          background: "#003366",
          color: "#fff",
          textAlign: "center",
          padding: "16px 0",
        }}
      >
        <Typography variant="body2">
          © 2024 Erisn Empowerment Program | All rights reserved.
        </Typography>
      </footer>
    </Box>
  );
};

export default LandingPage;
