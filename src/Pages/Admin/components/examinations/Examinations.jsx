/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { examinationSchema } from "../../../../Components/yupSchema/examinationSchema";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const Examinations = () => {
  const [examinations, setExaminations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const handleEdit = (id) => {
    const selectedExamination = examinations.find((exam) => exam._id === id);
    if (selectedExamination) {
      setEdit(true);
      setEditId(id);
      formik.setValues({
        date: selectedExamination.examDate,
        subject: selectedExamination.subject._id,
        examType: selectedExamination.examType,
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`${baseAPI}/examination/delete/${id}`);
        alert("Exam deleted successfully");
        fetchExaminations();
      } catch (err) {
        console.error("Error deleting exam:", err);
        alert("Failed to delete examination");
      }
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setEditId(null);
    formik.resetForm();
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const initialValues = {
    date: "",
    subject: "",
    examType: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: examinationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      console.log("Payload being sent:", {
        examDate: values.date,
        examType: values.examType,
        subjectId: values.subject,
        classId: selectedClass,
      });

      try {
        const URL = editId
          ? `${baseAPI}/examination/update/${editId}`
          : `${baseAPI}/examination/create`;

        const response = await axios.post(URL, {
          examDate: values.date,
          examType: values.examType,
          subjectId: values.subject,
          classId: selectedClass,
        });

        console.log("Server response:", response.data);
        alert(editId ? "Exam updated successfully" : "Exam added successfully");
        formik.resetForm();
        fetchExaminations();
        setEdit(false);
        setEditId(null);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          alert(
            `Failed to save examination: ${
              error.response.data.message || "Error occurred"
            }`
          );
        } else {
          console.error("Error saving exam:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${baseAPI}/subject/all`);
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseAPI}/class/all`);
      setClasses(response.data.data);
      setSelectedClass(response.data.data[0]?._id || "");
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchExaminations = async () => {
    try {
      if (selectedClass) {
        const response = await axios.get(
          `${baseAPI}/examination/class/${selectedClass}`
        );
        setExaminations(response.data.examinations);
      }
    } catch (error) {
      console.error("Error fetching examinations:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchExaminations();
  }, [selectedClass]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Examinations
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <FormControl sx={{ width: 180 }}>
          <InputLabel>Class</InputLabel>
          <Select
            label="Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <MenuItem value="">Select Class</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.class_text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Typography variant="h5">
            {edit ? "Edit Examination" : "Add New Examination"}
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(value) =>
                formik.setFieldValue("date", value?.toISOString() || "")
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
          {formik.touched.date && formik.errors.date && (
            <Typography color="error">{formik.errors.date}</Typography>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              label="Subject"
              value={formik.values.subject}
              name="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.subject_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.touched.subject && formik.errors.subject && (
            <Typography color="error">{formik.errors.subject}</Typography>
          )}

          <TextField
            name="examType"
            label="Exam Type"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formik.values.examType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.examType && formik.errors.examType && (
            <Typography color="error">{formik.errors.examType}</Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            {edit && (
              <Button
                onClick={handleCancel}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{convertDate(exam.examDate)}</TableCell>
                <TableCell>{exam.subject?.subject_name || "-"}</TableCell>
                <TableCell>{exam.examType}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(exam._id)}>
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleDelete(exam._id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Examinations;
