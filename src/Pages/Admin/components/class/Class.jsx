/* eslint-disable no-unused-vars */
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Form, useFormik } from "formik";

import React, { useEffect, useState } from "react";
import { classSchema } from "../../../../Components/yupSchema/classSchema";
import axios from "axios";
import { baseAPI } from "../../../../environment";

//Icons

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Class = () => {
  const [editId, setEditId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleEdit = (id, class_text, class_num) => {
    console.log("Edit", id);
    setEdit(true);
    setEditId(id);
    Formik.setFieldValue("class_text", class_text);
    Formik.setFieldValue("class_num", class_num);
  };
  const handleDelete = (id) => {
    console.log("Delete", id);
    axios
      .delete(`${baseAPI}/class/delete/${id}`)
      .then((res) => {
        console.log("Class delete response", res);

        alert("Class deleted successfully, reload the page to see changes");
        fetchAllClasses();
      })
      .catch((err) => {
        console.log("Error in deleting class", err);

        alert("Failed to delete class");
      });
  };
  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    Formik.setFieldValue("class_text", "");
    Formik.setFieldValue("class_num", "");
  };

  const Formik = useFormik({
    initialValues: { class_text: "", class_num: "" },
    validationSchema: classSchema,
    onSubmit: (values) => {
      console.log(values);

      if (edit) {
        axios
          .patch(
            `${baseAPI}/class/update/${editId}`,
            { ...values },
            {
              headers: {
                "Content-Type": "application/json", // Ensure the correct header is sent
              },
            }
          )
          .then((res) => {
            console.log("Class update response", res);
            alert("Class updated successfully");

            cancelEdit();
          })
          .catch((err) => {
            console.log(
              "Error in updating class",
              err.response ? err.response.data : err.message
            );
            alert("Failed to update class");
          });
      } else {
        axios
          .post(`${baseAPI}/class/create`, { ...values })
          .then((res) => {
            console.log("Class add response", res);
            alert("Class added successfully");
            fetchAllClasses();
          })
          .catch((err) => {
            console.log(
              "Error in adding class",
              err.response ? err.response.data : err.message
            );
            alert("Failed to add class");
          });

        Formik.resetForm();
      }
    },
  });

  const fetchAllClasses = () => {
    axios
      .get(`${baseAPI}/class/all`)
      .then((res) => {
        console.log("Classes", res.data);
        setClasses(res.data.data);
      })
      .catch((err) => {
        console.log("Error in fetching all classes", err);
      });
  };
  useEffect(() => {
    fetchAllClasses();
  }, []);
  return (
    <>
      <h1>Classes</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          minWidth: "230px",
          margin: "auto",
          background: "#fff",
        }}
        noValidate
        autoComplete="off"
        onSubmit={Formik.handleSubmit}
      >
        {edit ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Edit Class
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Add New Class
          </Typography>
        )}

        <TextField
          name="class_text"
          label="Class Text"
          value={Formik.values.class_text}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.class_text && Formik.errors.class_text && (
          <p style={{ color: "red" }}>{Formik.errors.class_text}</p>
        )}

        <TextField
          name="class_num"
          label="Class Number"
          value={Formik.values.class_num}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.class_num && Formik.errors.class_num && (
          <p style={{ color: "red" }}>{Formik.errors.class_num}</p>
        )}
        <Button type="submit" variant="contained">
          Submit
        </Button>

        {edit && (
          <Button
            onClick={() => cancelEdit()}
            type="button"
            variant="contained"
          >
            Cancel
          </Button>
        )}
      </Box>
      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {classes &&
          classes.map((x) => {
            return (
              <Paper key={x._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h4">
                    Class: {x.class_text} [{x.class_num}]
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(x._id, x.class_text, x.class_num);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(x._id);
                    }}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Paper>
            );
          })}
      </Box>
    </>
  );
};

export default Class;
