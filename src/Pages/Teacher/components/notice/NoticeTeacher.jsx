/* eslint-disable no-unused-vars */
import { Box, Button, Paper, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const NoticeTeacher = () => {
  const [notices, setNotices] = useState([]);

  const [filterAudience, setFilterAudience] = useState("all");

  const fetchAllNotices = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or context

    axios
      .get(`${baseAPI}/notice/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      })
      .then((res) => {
        console.log("Notices", res.data);
        setNotices(res.data.data);
      })
      .catch((err) => {
        console.log("Error in fetching all notices", err);
      });
  };

  useEffect(() => {
    fetchAllNotices();
  }, []);

  // Filter notices based on audience
  const filteredNotices = notices.filter(
    (notice) => filterAudience === "all" || notice.audience === filterAudience
  );

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "700",
          color: "primary.main",
          mb: 3,
        }}
      >
        Notices
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          backgroundColor: "grey.100",
          borderRadius: 2,
          boxShadow: 1,
          my: 2,
        }}
      >
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Notice For{" "}
            <Box
              component="span"
              sx={{
                ml: 1,
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              {filterAudience}
            </Box>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant={filterAudience === "student" ? "contained" : "outlined"}
            onClick={() => setFilterAudience("student")}
            sx={{
              minWidth: 150,
              textTransform: "uppercase",
            }}
          >
            Student Notices
          </Button>
          <Button
            variant={filterAudience === "teacher" ? "contained" : "outlined"}
            onClick={() => setFilterAudience("teacher")}
            sx={{
              minWidth: 150,
              textTransform: "uppercase",
            }}
          >
            Teacher Notices
          </Button>
          <Button
            variant={filterAudience === "all" ? "contained" : "outlined"}
            onClick={() => setFilterAudience("all")}
            sx={{
              minWidth: 150,
              textTransform: "uppercase",
            }}
          >
            All Notices
          </Button>
        </Box>
      </Box>
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
        {filteredNotices?.map((notice) => (
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
    </>
  );
};

export default NoticeTeacher;
