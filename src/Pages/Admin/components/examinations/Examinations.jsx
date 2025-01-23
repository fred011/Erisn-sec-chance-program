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
  const convertDate = (dateData) => {
    const date = new Date();

    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear
    );
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
      <Paper sx={{ marginBotton: "20px" }}>
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
      <Paper>
        <Box
          component="form"
          sx={{ width: "100%", margin: "auto" }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {edit ? (
            <Typography variant="h4">Edit Examination</Typography>
          ) : (
            <Typography variant="h4">Add New Examination</Typography>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
            <DatePicker
              label="Date"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(value) => {
                console.log("Selected Date:", value.toDate());
                formik.setFieldValue("date", value.toDate());
              }}
            />
          </LocalizationProvider>
          {formik.touched.date && formik.errors.date && (
            <p style={{ color: "red" }}>{formik.errors.date}</p>
          )}
          <FormControl fullWidth sx={{ marginTop: "10px" }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={formik.values.subject}
              name="subject"
              label="Subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <p style={{ color: "red" }}>{formik.errors.examType}</p>
          )}

          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Submit
          </Button>
          {editId && (
            <Button
              onClick={handleCancel}
              variant="outline"
              sx={{ marginTop: "10px" }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>
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
                <TableCell>{convertDate(examination.examDate)}</TableCell>
                <TableCell>
                  {examination.subject ? examination.subject.subject_name : " "}
                </TableCell>
                <TableCell>{examination.examType}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(examination._id)}>
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleDelete(examination._id)}
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
