/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
} from "@mui/material";
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
    },
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
    {
      id: 7,
      label: "Period 6 (14:00 AM - 15:00 AM)",
      startTime: "14:00",
      endTime: "15:00",
    },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: periodSchema,
    onSubmit: (values) => {
      // Split period into start and end times
      const [startTimeStr, endTimeStr] = values.period
        .split(",")
        .map((time) => time.trim());

      // Format start and end times with the selected date
      const startDateTime = new Date(
        values.date.setHours(
          parseInt(startTimeStr.split(":")[0], 10),
          parseInt(startTimeStr.split(":")[1], 10),
          0 // Set seconds to 0
        )
      ).toISOString(); // Convert to ISO string

      const endDateTime = new Date(
        values.date.setHours(
          parseInt(endTimeStr.split(":")[0], 10),
          parseInt(endTimeStr.split(":")[1], 10),
          0 // Set seconds to 0
        )
      ).toISOString(); // Convert to ISO string

      // Payload to send to the backend
      const payload = {
        teacher: values.teacher,
        subject: values.subject,
        selectedClass,
        startTime: startDateTime,
        endTime: endDateTime,
      };

      console.log("Formatted Payload: ", payload);

      // Sending data to the backend
      axios
        .post(`${baseAPI}/schedule/create`, payload)
        .then((res) => {
          console.log("Response ", res);
          alert("Period created successfully");
          fetchData();
        })
        .catch((e) => {
          console.log("Error ", e);
          alert("Failed to create period");
        });
    },
  });

  const fetchData = async () => {
    const teacherResponse = await axios.get(
      `${baseAPI}/teacher/fetch-with-query`,
      {
        params: {},
      }
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
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          minWidth: "230px",
          margin: "auto",
          marginTop: "5px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4" sx={{ fontWeight: "500" }}>
          Add New Period
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="teachers">Teacher</InputLabel>
          <Select
            labelId="teachers"
            id="teachers"
            value={formik.values.teacher}
            label="Teacher"
            name="teacher"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {teachers &&
              teachers.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {formik.touched.teacher && formik.errors.teacher && (
          <p style={{ color: "red" }}>{formik.errors.teacher}</p>
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
            {subjects &&
              subjects.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.subject_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {formik.touched.subject && formik.errors.subject && (
          <p style={{ color: "red" }}>{formik.errors.subject}</p>
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
            {periods &&
              periods.map((x) => (
                <MenuItem key={x.id} value={`${x.startTime}, ${x.endTime}`}>
                  {x.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {formik.touched.period && formik.errors.period && (
          <p style={{ color: "red" }}>{formik.errors.period}</p>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Date"
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
