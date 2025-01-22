/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";

export default function Attendee({ classId }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const handleSubmit = async () => {
    try {
      if (selectedTeacher) {
        const response = await axios.patch(
          `${baseAPI}/class/update/${classId}`,
          {
            attendee: selectedTeacher,
          }
        );
        console.log(response, "Submit attendee");
        alert("Attendee saved/updated successfully");
      } else {
        alert("Please select an attendee teacher first.");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const [attendee, setAttendee] = useState(null);
  const fetchClassDetails = async () => {
    if (classId) {
      try {
        const response = await axios.get(`${baseAPI}/class/single/${classId}`);
        setAttendee(
          response.data.data.attendee ? response.data.data.attendee : null
        );
        console.log("SINGLE CLASS:", response);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  const fetchTeachers = () => {
    axios
      .get(`${baseAPI}/teacher/fetch-with-query`, { params: {} })
      .then((res) => {
        setTeachers(res.data.teachers);
        console.log("Response Teachers", res);
      })
      .catch((e) => {
        console.log("Error in fetching class", e);
      });
  };

  useEffect(() => {
    console.log("CLASS ID:", classId);
    fetchClassDetails();
    fetchTeachers();
  }, [classId]);
  return (
    <>
      <h1>Attendee</h1>

      <Box>
        {attendee && (
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              Attendee Teacher :
            </Typography>
            <Typography variant="h5">{attendee.name}</Typography>
          </Box>
        )}

        <FormControl fullWidth>
          <InputLabel>Select Teachers</InputLabel>
          <Select
            value={selectedTeacher}
            name="teacher"
            label="Select Teachers"
            onChange={(e) => {
              setSelectedTeacher(e.target.value);
            }}
          >
            <MenuItem>Select Teacher</MenuItem>
            {teachers &&
              teachers.map((x) => {
                return (
                  <MenuItem key={x._id} value={x._id}>
                    {x.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <Button onClick={handleSubmit}>
          {attendee ? "Change Attendee" : "Select Attendee"}
        </Button>
      </Box>
    </>
  );
}
