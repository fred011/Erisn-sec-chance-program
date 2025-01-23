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
  const [attendee, setAttendee] = useState(null);

  const handleSubmit = async () => {
    try {
      if (selectedTeacher) {
        const response = await axios.patch(
          `${baseAPI}/class/update/${classId}`,
          { attendee: selectedTeacher }
        );
        console.log(response, "Submit attendee");
        alert("Attendee saved/updated successfully");
        fetchClassDetails(); // Refresh attendee after submission
      } else {
        alert("Please select an attendee teacher first.");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const fetchClassDetails = async () => {
    if (classId) {
      try {
        const response = await axios.get(`${baseAPI}/class/single/${classId}`);
        setAttendee(
          response.data.data.attendee ? response.data.data.attendee : null
        );
        console.log("SINGLE CLASS:", response);
      } catch (error) {
        console.error("ERROR", error);
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
        console.error("Error in fetching teachers", e);
      });
  };

  useEffect(() => {
    console.log("CLASS ID:", classId);
    fetchClassDetails();
    fetchTeachers();
  }, [classId]);

  return (
    <>
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "500", textAlign: "center" }}
        >
          Attendee Management
        </Typography>

        {attendee && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              p: 2,
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              Current Attendee:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", color: "primary.main" }}
            >
              {attendee.name}
            </Typography>
          </Box>
        )}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Teacher</InputLabel>
          <Select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <MenuItem value="">
              <em>Select Teacher</em>
            </MenuItem>
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: "600",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={handleSubmit}
        >
          {attendee ? "Change Attendee" : "Select Attendee"}
        </Button>
      </Box>
    </>
  );
}
