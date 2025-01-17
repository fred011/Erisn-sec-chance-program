/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { Select } from "antd";
import { useFormik } from "formik";
import { periodSchema } from "../../../../Components/yupSchema/periodSchema";
import { useEffect, useState } from "react";
import axios from "axios";

import { baseAPI } from "../../../../environment";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function ScheduleEvent({ selectedClass }) {
  const initialValues = {
    teacher: "",
    subject: "",
    period: "",
    date: new Date(),
  };
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const periods = [
    {
      id: 1,
      label: "Period 1 (08:00 AM - 09:00 AM)",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      id: 2,
      label: "Period 2 (09:00 AM - 10:00 AM)",
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      id: 3,
      label: "Period 3 (10:00 AM - 11:00 AM)",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 4,
      label: "Lunch Break (11:00 AM - 12:00 AM)",
      startTime: "11:00",
      endTime: "12:00",
    }, // Lunch Break
    {
      id: 5,
      label: "Period 4 (12:00 AM - 13:00 AM)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 6,
      label: "Period 5 (13:00 AM - 14:00 AM)",
      startTime: "13:00",
      endTime: "14:00",
    },
  ];

  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: periodSchema,
    onSubmit: (values) => {
      let date = values.date;
      let startTime = values.period.split(",")[0];
      let endTime = values.period.split(",")[1];

      console.log({
        ...values,
        selectedClass,
        startTime: new Date(
          date.setHours(startTime.split(":")[0], startTime.split(":")[1])
        ),
        endTime: new Date(
          date.setHours(endTime.split(":")[0], endTime.split(":")[1])
        ),
      });

      console.log("Schedule", { ...values, date, startTime, endTime });
      axios
        .post(`${baseAPI}/schedule/create`, {
          ...values,
          selectedClass,
          startTime: new Date(
            date.setHours(startTime.split(":")[0], startTime.split(":")[1])
          ),
          endTime: new Date(
            date.setHours(endTime.split(":")[0], endTime.split(":")[1])
          ),
        })
        .then((res) => {
          console.log("Response ", res);
        })
        .catch((e) => {
          console.log("Error ", e);
        });
    },
  });

  const fetchData = async () => {
    const teacherResponse = await axios.get(
      `${baseAPI}/teacher/fetch-with-query`,
      { params: {} }
    );
    const subjectResponse = await axios.get(`${baseAPI}/subject/all`, {
      params: {},
    });
    setTeachers(teacherResponse.data.teachers);
    setSubjects(subjectResponse.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 }, // Add margin to child elements
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          minWidth: "230px",
          margin: "auto",
          marginTop: "50px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit} // Attach Formik's submit handler
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          Add New Period
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="teachers">Teachers</InputLabel>
          <Select
            // labelId="teachers"
            // id="teachers"
            value={formik.values.teachers}
            label="Teacher"
            name="teacher"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {/* <MenuItem value={""}>Select Class</MenuItem> */}
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
        {formik.touched.teacher && formik.errors.teacher && (
          <p style={{ color: "red" }}>{formik.errors.teacher}</p> // Show error if name is invalid
        )}

        <FormControl fullWidth>
          <InputLabel id="subjects">Subjects</InputLabel>
          <Select
            value={formik.values.subject}
            label="Subjects"
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {/* <MenuItem value={""}>Select Class</MenuItem> */}
            {subjects &&
              subjects.map((x) => {
                return (
                  <MenuItem key={x._id} value={x._id}>
                    {x.subject_name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        {formik.touched.subject && formik.errors.subject && (
          <p style={{ color: "red" }}>{formik.errors.subject}</p> // Show error if name is invalid
        )}
        <FormControl fullWidth>
          <InputLabel id="period">Periods</InputLabel>
          <Select
            labelId="period"
            id="period"
            value={formik.values.period}
            label="Periods"
            name="period"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {/* <MenuItem value={""}>Select Class</MenuItem> */}
            {periods &&
              periods.map((x) => {
                return (
                  <MenuItem key={x._id} value={`${x.startTime}, ${x.endTime}`}>
                    {x.label}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        {formik.touched.period && formik.errors.period && (
          <p style={{ color: "red" }}>{formik.errors.period}</p> // Show error if name is invalid
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Basic date picker"
              value={dayjs(formik.values.date)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button type="submit" variant="contained">
          Add Event
        </Button>
      </Box>
    </>
  );
}
