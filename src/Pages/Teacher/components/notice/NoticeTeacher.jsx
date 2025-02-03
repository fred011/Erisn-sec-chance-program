/* eslint-disable no-unused-vars */
import { Box, Button, Paper, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const NoticeTeacher = () => {
  const [notices, setNotices] = useState([]);

  const fetchAllNotices = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or context

    axios
      .get(`${baseAPI}/notice/teacher-notice`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      })
      .then((res) => {
        console.log("Teacher Notices", res.data);
        setNotices(res.data.data);
      })
      .catch((err) => {
        console.log("Error in fetching all Teacher notices", err);
      });
  };

  useEffect(() => {
    fetchAllNotices();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#dedede", // Light gray background
          minHeight: "100vh", // Full page height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            color: "primary.main",
            mb: 5,
          }}
        >
          Notices
        </Typography>

        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {notices.map((notice) => (
            <Paper
              key={notice._id}
              sx={{
                width: 300,
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 3,
                },
              }}
              elevation={2}
            >
              <Box>
                <Typography variant="h5" color="primary" gutterBottom>
                  {notice.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {notice.message}
                </Typography>
                <Typography variant="subtitle2" color="text.disabled">
                  Audience: {notice.audience.toUpperCase()}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default NoticeTeacher;
