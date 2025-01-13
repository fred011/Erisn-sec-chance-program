/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Box } from "@mui/material";
import { Typography } from "antd";

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

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
