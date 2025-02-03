/* eslint-disable no-unused-vars */

import React from "react";

import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../../AuthPages/AuthContext";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const Dashboard = () => {
  const { auth } = React.useContext(AuthContext);
  const token = auth?.token; // Get token from context instead
  console.log("Token from context:", token);
  const [adminDetails, setAdminDetails] = React.useState(null);

  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(`${baseAPI}/admin/fetch-single`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  React.useEffect(() => {
    if (token) {
      fetchAdminDetails();
    } else {
      console.log("No token available, cannot fetch admin details");
    }
  }, [token]); // This will rerun when the token changes
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
            Welcome, {adminDetails ? adminDetails.name : "Admin"}
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
