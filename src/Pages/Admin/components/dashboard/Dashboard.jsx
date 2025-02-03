/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../../AuthPages/AuthContext";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const Dashboard = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Retrieve token from localStorage

  const fetchAdminDetails = async () => {
    if (!token) {
      console.log("No token available, cannot fetch admin details");
      return;
    }
    try {
      const response = await axios.get(`${baseAPI}/admin/fetch-single`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
        withCredentials: true,
      });

      setAdminDetails(response.data.admin);
    } catch (error) {
      console.error(
        "Error fetching admin details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      console.log("Token is available, fetching admin details...");
      fetchAdminDetails();
    }
  }, [token]); // This effect runs when the token is set
  return (
    <Box
      sx={{
        backgroundColor: "#dedede", // Light gray background
        minHeight: "100vh",
      }}
    >
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
            Welcome, {adminDetails ? adminDetails.name : "Admin"}
          </Typography>

          <Typography variant="h5" color="grey">
            To Erisn Africa`s Student Management System
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
