import React, { useEffect, useState } from "react";
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

  const formik = useFormik({
    initialValues: {
      date: "",
      subjectId: "",
      examType: "",
    },
    validationSchema: examinationSchema,
    onSubmit: async (values, { resetForm }) => {
      const requestData = {
        date: values.date,
        examType: values.examType,
        subjectId: values.subjectId,
        classId: selectedClass,
      };

      try {
        if (edit) {
          await axios.patch(
            `${baseAPI}/examination/update/${editId}`,
            requestData
          );
          alert("Exam updated successfully");
        } else {
          await axios.post(`${baseAPI}/examination/create`, requestData);
          alert("Exam added successfully");
        }
        fetchExaminations();
        resetForm();
        handleCancel();
      } catch (error) {
        console.error("Error:", error.response || error.message);
        alert("Failed to process examination.");
      }
    },
  });

  const handleEdit = (id) => {
    const selectedExamination = examinations.find((exam) => exam._id === id);
    if (selectedExamination) {
      setEdit(true);
      setEditId(id);
      formik.setValues({
        date: selectedExamination.examDate,
        subjectId: selectedExamination.subject._id,
        examType: selectedExamination.examType,
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`${baseAPI}/examination/delete/${id}`);
        fetchExaminations();
      } catch (error) {
        console.error("Error deleting examination:", error);
        alert("Failed to delete examination.");
      }
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setEditId(null);
    formik.resetForm();
  };

  const handleClass = (e) => {
    setSelectedClass(e.target.value);
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
      <h1>Examinations</h1>
      <Paper sx={{ marginBottom: "20px" }}>
        <Box>
          <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
            <InputLabel id="student_class">Class</InputLabel>
            <Select
              label="Student Class"
              value={selectedClass}
              onChange={handleClass}
            >
              <MenuItem value="">Select Class</MenuItem>
              {classes.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.class_text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <form
        style={{ width: "100%", margin: "auto" }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4">
          {edit ? "Edit Examination" : "Add New Examination"}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={formik.values.date ? dayjs(formik.values.date) : null}
            onChange={(value) => {
              if (value) formik.setFieldValue("date", value.toDate());
            }}
          />
        </LocalizationProvider>
        {formik.touched.date && formik.errors.date && (
          <Typography color="error">{formik.errors.date}</Typography>
        )}
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={formik.values.subjectId}
            name="subjectId"
            label="Subject"
            onChange={formik.handleChange}
          >
            {subjects?.map((subject) => (
              <MenuItem key={subject._id} value={subject._id}>
                {subject.subject_name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.subjectId && formik.errors.subjectId && (
            <Typography color="error">{formik.errors.subjectId}</Typography>
          )}
        </FormControl>
        <TextField
          name="examType"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Exam Type"
          value={formik.values.examType}
          variant="filled"
          fullWidth
          style={{ marginTop: "10px" }}
        />
        {formik.touched.examType && formik.errors.examType && (
          <Typography color="error">{formik.errors.examType}</Typography>
        )}
        <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
          Submit
        </Button>
        {edit && (
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{ marginTop: "10px" }}
          >
            Cancel
          </Button>
        )}
      </form>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
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
            {examinations.map((examination) => (
              <TableRow key={examination._id}>
                <TableCell>
                  {new Date(examination.examDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {examination.subject ? examination.subject.subject_name : ""}
                </TableCell>
                <TableCell>{examination.examType}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(examination._id)}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(examination._id)}
                    sx={{ color: "red" }}
                  >
                    Delete
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
