/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const Dashboard = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Retrieve token from localStorage
  const [loading, setLoading] = useState(true); // Loader state

  const fetchAdminDetails = async () => {
    if (!token) {
      console.log("No token available, cannot fetch admin details");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${baseAPI}/admin/fetch-single`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setAdminDetails(response.data.admin);
    } catch (error) {
      console.error(
        "Error fetching admin details:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminDetails();
    }
  }, [token]);

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
        {loading ? (
          <CircularProgress sx={{ color: "white" }} /> // Loader while fetching data
        ) : (
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
        )}
      </Box>
    </>
  );
};

export default Dashboard;
