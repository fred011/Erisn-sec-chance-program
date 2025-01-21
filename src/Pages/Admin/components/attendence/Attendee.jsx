/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
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
    fetchTeachers();
  }, [classId]);
  return (
    <>
      <h1>Attendee</h1>

      <Box>
        <FormControl fullWidth>
          <InputLabel>Teacher</InputLabel>
          <Select
            value={selectedTeacher}
            name="teacher"
            label="Teacher"
            onChange={(e) => {
              setSelectedTeacher(e.target.value);
            }}
          >
            <MenuItem>Select Attende</MenuItem>
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
      </Box>
    </>
  );
}
