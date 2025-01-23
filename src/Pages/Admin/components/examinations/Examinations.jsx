/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { examinationSchema } from "../../../../Components/yupSchema/examinationSchema";
import { baseAPI } from "../../../../environment";
import axios from "axios";
import { useEffect } from "react";

export default function Examinations() {
  const [examinations, setExaminations] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState("");

  const convertDate = (dateData) => {
    const date = new Date(dateData);

    return (
      date.getDate() + "-" + (+date.getMonth + 1) + "-" + date.getFullYear()
    );
  };

  const initialValues = {
    date: "",
    subject: "",
    examType: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: examinationSchema,
    onSubmit: async (value) => {
      try {
        console.log("Examination", value);
        const response = await axios.post(`${baseAPI}/examination/create`, {
          date: value.date,
          subjectId: value.subject,
          classId: selectedClass,
          examType: value.examType,
        });
        alert("New Exam Saved Successfully");
        formik.resetForm();
        console.log("RESPONSE NEW EXAM", response);
      } catch (error) {
        console.log("Error saving new Exam", error);
        alert("Failed to save Exam");
      }
    },
  });

  const fetchExaminations = async () => {
    try {
      if (selectedClass) {
        const response = await axios.get(
          `${baseAPI}/examination/class/${selectedClass}`
        );
        console.log("FETCHED EXAM:", response);
        setExaminations(response.data.examinations);
      }
    } catch (error) {
      console.log("Error fetching Exam Data", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${baseAPI}/subject/all`);
      console.log("EXAM SUBJECTS:", response);
      setSubjects(response.data.data);
    } catch (error) {
      console.log("Error fetching Subjects (Exam Comp)", error);
    }
  };
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseAPI}/class/all`);
      console.log("EXAM Classes:", response);
      setClasses(response.data.data);
      setSelectedClass;
    } catch (error) {
      console.log("Error fetching classes (Exam Comp)", error);
    }
  };
  useEffect(() => {
    fetchExaminations();
  }, [selectedClass]);
  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

  return (
    <>
      <Paper sx={{ marginBottom: "20px" }}>
        <Box>
          <FormControl sx={{ marginTop: "10px", minWidth: "210px" }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedClass}
              label="Class"
              onChange={(e) => {
                setSelectedClass(e.target.value);
              }}
            >
              <MenuItem value={""}>Select Class</MenuItem>
              {classes?.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.class_text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Paper>
        <Box
          component="form"
          sx={{ width: "100%", minWidth: "310px", margin: "auto" }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            Add New Exam
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              name="date"
              onChange={(newValue) => {
                formik.setFieldValue("date", newValue);
              }}
              onBlur={formik.handleBlur}
            />
          </LocalizationProvider>
          {formik.touched.date && formik.errors.date && (
            <Typography color="error">{formik.errors.date}</Typography>
          )}
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={formik.values.subject}
              name="subject"
              label="Subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            >
              <MenuItem value={""}>Select Subject</MenuItem>
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
          <TextField
            name="examType"
            value={formik.values.examType}
            label="Exam Type"
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            sx={{ marginTop: "10px" }}
          />
          {formik.touched.examType && formik.errors.examType && (
            <Typography color="error">{formik.errors.examType}</Typography>
          )}

          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Submit
          </Button>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Exam Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((examination) => (
              <TableRow
                key={examination._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="examination">
                  {convertDate(examination.examDate)}
                </TableCell>
                <TableCell>
                  {examination.subject ? examination.subject.subject_name : ""}
                </TableCell>
                <TableCell>{examination.examType}</TableCell>
                <TableCell>`Action`</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
