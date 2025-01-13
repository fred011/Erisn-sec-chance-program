/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <h1>Admin Dash</h1>

      <Box
        sx={{
          height: "500px",
          width: "100%",
          background: `url(/images/BackG.jpg)`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography varient="h3">
          Erisn Africa`s Student Management System
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;
