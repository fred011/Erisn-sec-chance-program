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
  const [schedules, setSchedules] = useState([]);

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
      label: "Lunch Break (11:00 AM - 12:00 PM)",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 5,
      label: "Period 4 (12:00 PM - 1:00 PM)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 6,
      label: "Period 5 (1:00 PM - 2:00 PM)",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 7,
      label: "Period 6 (2:00 PM - 3:00 PM)",
      startTime: "14:00",
      endTime: "15:00",
    },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: periodSchema,
    onSubmit: (values) => {
      const { date, period } = values;
      const [startTime, endTime] = period.split(",");
      const formattedData = {
        ...values,
        selectedClass,
        startTime: new Date(
          date.setHours(startTime.split(":"[0]), startTime.split(":"[1]))
        ),
        endTime: new Date(
          date.setHours(endTime.split(":"[0]), endTime.split(":"[1]))
        ),
      };

      console.log("Submitting the following data:", formattedData);

      axios
        .post(`${baseAPI}/schedule/create`, formattedData)
        .then((res) => {
          console.log("API Response:", res.data);
          alert("Period created successfully");
          fetchSchedules();
        })
        .catch((e) => {
          console.error("Error creating period:", e);
          alert("Failed to create period");
        });
    },
  });

  const fetchData = async () => {
    try {
      const teacherResponse = await axios.get(
        `${baseAPI}/teacher/fetch-with-query`
      );
      console.log("Fetched Teachers:", teacherResponse.data);
      const subjectResponse = await axios.get(`${baseAPI}/subject/all`);
      console.log("Fetched Subjects:", subjectResponse.data);

      setTeachers(teacherResponse.data.teachers || []);
      setSubjects(subjectResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const scheduleResponse = await axios.get(
        `${baseAPI}/schedule/class/${selectedClass}`
      );
      console.log("Fetched Schedules:", scheduleResponse.data);
      setSchedules(scheduleResponse.data.schedules || []);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`${baseAPI}/schedule/${id}`);
      alert("Schedule deleted successfully");
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete schedule");
    }
  };

  useEffect(() => {
    fetchData();
    fetchSchedules();
  }, [selectedClass]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "60vw",
        minWidth: "300px",
        margin: "auto",
      }}
    >
      <Typography variant="h4">Add New Period</Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={formik.handleSubmit}
      >
        <FormControl fullWidth>
          <InputLabel>Teacher</InputLabel>
          <Select
            value={formik.values.teacher}
            name="teacher"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {teachers?.map((x) => (
              <MenuItem key={x._id} value={x._id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.teacher && formik.errors.teacher && (
            <Typography color="error">{formik.errors.teacher}</Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>
          <Select
            value={formik.values.subject}
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {subjects?.map((x) => (
              <MenuItem key={x._id} value={x._id}>
                {x.subject_name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.subject && formik.errors.subject && (
            <Typography color="error">{formik.errors.subject}</Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Period</InputLabel>
          <Select
            value={formik.values.period}
            name="period"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {periods.map((x) => (
              <MenuItem key={x.id} value={`${x.startTime},${x.endTime}`}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.period && formik.errors.period && (
            <Typography color="error">{formik.errors.period}</Typography>
          )}
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={dayjs(formik.values.date)}
            onChange={(value) => {
              console.log("Selected Date:", value.toDate());
              formik.setFieldValue("date", value.toDate());
            }}
          />
        </LocalizationProvider>

        <Button type="submit" variant="contained">
          Add Event
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Existing Schedules
      </Typography>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <Box
            key={schedule._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography>
              {schedule.subject} - {schedule.startTime} to {schedule.endTime}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteSchedule(schedule._id)}
            >
              Delete
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No schedules available</Typography>
      )}
    </Box>
  );
}
