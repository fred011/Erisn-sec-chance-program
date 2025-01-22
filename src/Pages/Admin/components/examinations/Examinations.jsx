/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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

      if (edit) {
        axios
          .put(`${baseAPI}/examination/update/${editId}`, requestData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log("Examination update response", res);
            alert("Exam updated successfully");
            fetchExaminations();
            handleCancel();
          })
          .catch((err) => {
            console.error(
              "Error updating examination",
              err.response ? err.response.data : err.message
            );
            alert("Failed to update examination.");
          });
      } else {
        axios
          .post(`${baseAPI}/examination/create`, requestData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log("Examination create response", res);
            alert("Exam added successfully");
            fetchExaminations();
            resetForm();
          })
          .catch((err) => {
            console.error(
              "Error creating examination",
              err.response ? err.response.data : err.message
            );
            alert("Failed to add examination.");
          });
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
        <FormControl sx={{ width: "310px" }}>
          <InputLabel>Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.class_text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(value) =>
                formik.setFieldValue("date", value?.toISOString())
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={formik.values.subjectId}
              name="subjectId"
              onChange={formik.handleChange}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.subject_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Exam Type"
            name="examType"
            value={formik.values.examType}
            onChange={formik.handleChange}
            sx={{ marginTop: "20px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button type="submit" variant="contained">
              {edit ? "Update" : "Add"} Exam
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
              <TableCell>Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>
                  {new Date(exam.examDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{exam.subject?.subject_name || "-"}</TableCell>
                <TableCell>{exam.examType}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(exam._id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDelete(exam._id)} color="error">
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
