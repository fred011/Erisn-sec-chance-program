/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);
  const fetchAdmin = () => {
    // fetch admin data
    axios
      .get(`${baseAPI}/admin/fetch-admin`)
      .then((res) => {
        console.log(res);
        setAdmin(res.data.admin);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <>
      <h1>Admin Dash</h1>
      {admin && (
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
          <Typography varient="h3">Welcome, {admin.name}</Typography>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
