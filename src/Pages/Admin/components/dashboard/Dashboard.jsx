/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchAdminName = async () => {
      try {
        const response = await fetch(
          "https://erisn-api.onrender.com/api/admin/name"
        );
        const data = await response.json();
        setAdminName(data.name);
      } catch (error) {
        console.error("Error fetching admin name:", error);
      }
    };

    fetchAdminName();
  }, []);

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
        <Typography variant="h3" color="white">
          Welcome Admin
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;
