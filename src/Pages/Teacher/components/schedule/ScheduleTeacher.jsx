/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import axios from "axios";
import { baseAPI } from "../../../../environment";

const localizer = momentLocalizer(moment);

export default function ScheduleTeacher() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const date = new Date();
  const myEventsList = [
    {
      id: 1,
      title: "Subject: History, Teacher: Harry",
      start: new Date(date.setHours(9, 30)),
      end: new Date(date.setHours(11, 30)),
    },
  ];
  const [events, setEvents] = useState(myEventsList);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or context
    axios
      .get(`${baseAPI}/class/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      })
      .then((res) => {
        setClasses(res.data.data);
        setSelectedClass(res.data.data[0]._id);
        console.log("Fetched classes : ", res.data.data);
        console.log("Selected class : ", res.data.data[0]._id);
      })
      .catch((e) => {
        console.log("Fetch class error", e);
      });
  }, []);

  const fetchSchedule = (selectedClass) => {
    if (selectedClass) {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage or context
      console.log("Fetching schedules for class:", selectedClass);

      axios
        .get(`${baseAPI}/schedule/fetch-with-class/${selectedClass}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        })
        .then((res) => {
          console.log("API Response:", res.data);

          if (res.data.data.length === 0) {
            console.log("No schedules found:");

            setEvents([]); // Clear events if no schedules
          } else {
            const resData = res.data.data.map((x) => {
              return {
                id: x._id,
                title: `Subject: ${x.subject.subject_name} , Teacher:${x.teacher.name}`,
                start: new Date(x.startTime),
                end: new Date(x.endTime),
              };
            });
            setEvents(resData); // Update with retrieved schedules
          }
        })
        .catch((err) => {
          console.log(
            "Error in fetching schedule: ",
            err.response?.data || err
          );
        });
    }
  };

  useEffect(() => {
    fetchSchedule(selectedClass);
  }, [selectedClass]);

  // Function to handle adding new period

  return (
    <Box
      sx={{
        backgroundColor: "#dedede", // Light gray background
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "500",
          color: "#1976d2",
          marginBottom: 2,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Schedule
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "500",
          color: "#1976d2",
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        Class
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Select
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        >
          {classes &&
            classes.map((x) => (
              <MenuItem key={x._id} value={x._id}>
                {x.class_text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Box sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}>
        <Calendar
          defaultView="week"
          localizer={localizer}
          events={events}
          step={30}
          timeslots={1}
          min={new Date(1970, 1, 1, 7, 0, 0)}
          startAccessor="start"
          endAccessor="end"
          max={new Date(1970, 1, 1, 17, 0, 0)}
          defaultDate={new Date()}
          showMultiDayTimes
          style={{
            height: "80vh", // Adjusting calendar height to make it more responsive
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
          views={["week", "day", "agenda"]}
        />
      </Box>
    </Box>
  );
}
