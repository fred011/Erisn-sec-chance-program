/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseAPI } from "../../../../environment";

export default function Attendee({ classId }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`${baseAPI}/class/update/${classId}`, {
        attendee: selectedTeacher,
      });
      console.log(response, "Submit attendee");
    } catch (error) {
      console.log("ERROR:", error);
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
    fetchTeachers();
  }, [classId]);
  return (
    <>
      <h1>Attendee</h1>

      <Box>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </>
  );
}
