/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { classSchema } from "../../../../Components/yupSchema/classSchema";
import axios from "axios";
import { baseAPI } from "../../../../environment";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Class = () => {
  const [editId, setEditId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [edit, setEdit] = useState(false);

  const fetchAllClasses = () => {
    axios
      .get(`${baseAPI}/class/all`)
      .then((res) => {
        console.log("Classes", res.data);
        setClasses(res.data.data);
      })
      .catch((err) => {
        console.error("Error in fetching all classes", err);
      });
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const handleEdit = (id, class_text, class_num) => {
    setEdit(true);
    setEditId(id);
    formik.setFieldValue("class_text", class_text);
    formik.setFieldValue("class_num", class_num);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      axios
        .delete(`${baseAPI}/class/delete/${id}`)
        .then((res) => {
          console.log("Class delete response", res);
          alert("Class deleted successfully.");
          fetchAllClasses();
        })
        .catch((err) => {
          console.error("Error in deleting class", err);
          alert("Failed to delete class.");
        });
    }
  };

  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { class_text: "", class_num: "" },
    validationSchema: classSchema,
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        axios
          .patch(`${baseAPI}/class/update/${editId}`, values)
          .then((res) => {
            console.log("Class update response", res);
            alert("Class updated successfully.");
            cancelEdit();
            fetchAllClasses();
          })
          .catch((err) => {
            console.error("Error in updating class", err);
            alert("Failed to update class.");
          });
      } else {
        axios
          .post(`${baseAPI}/class/create`, values)
          .then((res) => {
            console.log("Class add response", res);
            alert("Class added successfully.");
            resetForm();
            fetchAllClasses();
          })
          .catch((err) => {
            console.error("Error in adding class", err);
            alert("Failed to add class.");
          });
      }
    },
  });

  return (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "700", mb: 3 }}
      >
        Classes
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "90%", sm: "60%" },
          margin: "auto",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            mb: 2,
            color: "#1976d2",
          }}
        >
          {edit ? "Edit Class" : "Add New Class"}
        </Typography>

        <TextField
          name="class_text"
          label="Class Text"
          value={formik.values.class_text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.class_text && Boolean(formik.errors.class_text)}
          helperText={formik.touched.class_text && formik.errors.class_text}
          fullWidth
        />

        <TextField
          name="class_num"
          label="Class Number"
          value={formik.values.class_num}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.class_num && Boolean(formik.errors.class_num)}
          helperText={formik.touched.class_num && formik.errors.class_num}
          fullWidth
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: edit ? "space-between" : "center",
            gap: 2,
          }}
        >
          <Button type="submit" variant="contained" sx={{ width: "120px" }}>
            Submit
          </Button>

          {edit && (
            <Button
              onClick={cancelEdit}
              variant="outlined"
              color="secondary"
              sx={{ width: "120px" }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Class Text</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Class Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((x) => (
              <TableRow
                key={x._id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell>{x.class_text}</TableCell>
                <TableCell>{x.class_num}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(x._id, x.class_text, x.class_num)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(x._id)}
                    aria-label="delete"
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Class;
