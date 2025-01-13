/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";
import axios from "axios";
import { Box } from "@mui/material";
import { Typography } from "antd";

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

  const fetchAdmin = () => {
    axios
      .get(`https://erisn-api.onrender.com/api/admin`)
      .then((res) => {
        console.log(res);
        setAdmin(res.data.admin);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {}, []);
  return (
    <>
      {admin && (
        <Box>
          <Typography.Title level={2}>Welcome {admin.name}</Typography.Title>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
