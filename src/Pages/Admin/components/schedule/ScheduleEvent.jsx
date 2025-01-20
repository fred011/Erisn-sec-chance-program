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

export default function ScheduleEvent({
  selectedClass,
  handleEventClose,
  edit,
  selectedEventId,
}) {
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
      label: "Lunch Break (11:00 AM - 12:00 PM)",
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 5,
      label: "Period 4 (12:00 PM - 13:00 PM)",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 6,
      label: "Period 5 (13:00 PM - 14:00 PM)",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 7,
      label: "Period 6 (14:00 PM - 15:00 PM)",
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

      // Ensure the date is properly formatted and valid
      const selectedDate = dayjs(date);

      if (!selectedDate.isValid()) {
        alert("Invalid date selected.");
        return;
      }

      // Construct startTime and endTime using dayjs
      const formattedStartTime = selectedDate
        .hour(parseInt(startTime.split(":")[0], 10))
        .minute(parseInt(startTime.split(":")[1], 10))
        .toDate();

      const formattedEndTime = selectedDate
        .hour(parseInt(endTime.split(":")[0], 10))
        .minute(parseInt(endTime.split(":")[1], 10))
        .toDate();

      const formattedData = {
        ...values,
        selectedClass,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };

      console.log("Submitting the following data:", formattedData);

      axios
        .post(`${baseAPI}/schedule/create`, formattedData)
        .then((res) => {
          console.log("API Response:", res.data);
          alert("Period created successfully");
          formik.resetForm();
          handleEventClose();
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

  useEffect(() => {
    fetchData();
  }, [selectedClass]);
  const dateFormat = (date) => {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();
    return `${dateHours}:${dateMinutes < 10 ? "0" : ""}${dateMinutes}`;
  };

  useEffect(() => {
    if (selectedEventId) {
      axios
        .get(`${baseAPI}/schedule/fetch/${selectedEventId}`)
        .then((res) => {
          formik.setFieldValue("teacher", res.data.data.teacher);
          formik.setFieldValue("subject", res.data.data.subject);
          let start = new Date(res.data.data.startTime);
          let end = new Date(res.data.data.endTime);

          formik.setFieldValue("date", start);
          const finalFormattedTime = dateFormat(start) + "," + dateFormat(end);
          formik.setFieldValue("period", finalFormattedTime);
          console.log(
            end.getHours(),
            (end.getMinutes() < 10 ? "0" : "") + end.getMinutes()
          );
          formik.setFieldValue("teacher", res.data.data.teacher);
          console.log("RESPONSE : ", res);
        })
        .catch((e) => {
          console.log("ERROR Fecthing wit ID", e);
        });
    }
  }, [selectedEventId]);

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
      {edit ? (
        <Typography variant="h4">Edit Period</Typography>
      ) : (
        <Typography variant="h4">Add New Period</Typography>
      )}

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
            label="Teacher"
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
            label="Subject"
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
            label="Period"
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
            value={formik.values.date ? dayjs(formik.values.date) : null}
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
    </Box>
  );
}
