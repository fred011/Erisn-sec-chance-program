/* eslint-disable no-unused-vars */

import React from "react";

import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          height: "270px",
          width: "100%",
          background: `url(/images/BackG.jpg)`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color="lightgrey">
            Welcome, Admin
          </Typography>

          <Typography variant="h5" color="grey">
            To Erisn Africa`s Student Management System
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
