/* eslint-disable no-unused-vars */
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Form, useFormik } from "formik";

import React, { useEffect, useState } from "react";
import { subjectSchema } from "../../../../Components/yupSchema/subjectSchema";
import axios from "axios";
import { baseAPI } from "../../../../environment";

//Icons

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Subject = () => {
  const [editId, setEditId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleEdit = (id, subject_name, subject_codename) => {
    console.log("Edit", id);
    setEdit(true);
    setEditId(id);
    Formik.setFieldValue("subject_name", subject_name);
    Formik.setFieldValue("subject_codename", subject_codename);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete subject?")) {
      console.log("Delete", id);
      axios
        .delete(`${baseAPI}/subject/delete/${id}`)
        .then((res) => {
          console.log("Subject delete response", res);

          alert("Subject deleted successfully, reload the page to see changes");
          fetchAllSubjects();
        })
        .catch((err) => {
          console.log("Error in deleting subject", err);

          alert("Failed to delete subject");
        });
    }
  };
  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    Formik.setFieldValue("subject_name", "");
    Formik.setFieldValue("subject_codename", "");
  };

  const Formik = useFormik({
    initialValues: { subject_name: "", subject_codename: "" },
    validationSchema: subjectSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Submitting values:", values);
      // Check if values.subject_name and values.subject_codename are populated
      if (!values.subject_name || !values.subject_codename) {
        alert("Both fields are required.");
        return;
      }

      if (edit) {
        axios
          .patch(
            `${baseAPI}/subject/update/${editId}`,
            { ...values },
            {
              headers: {
                "Content-Type": "application/json", // Ensure the correct header is sent
              },
            }
          )
          .then((res) => {
            console.log("Subject update response", res);
            alert("Subject updated successfully");

            cancelEdit();
            fetchAllSubjects();
          })
          .catch((err) => {
            console.log(
              "Error in updating subject",
              err.response ? err.response.data : err.message
            );
            alert("Failed to update subject");
          });
      } else {
        axios
          .post(`${baseAPI}/subject/create`, { ...values })
          .then((res) => {
            console.log("Subject add response", res);
            alert("Subject added successfully");

            resetForm();
            fetchAllSubjects();
          })
          .catch((err) => {
            console.log(
              "Error in adding subject",
              err.response ? err.response.data : err.message
            );
            alert("Failed to add subject");
          });
      }
    },
  });

  const fetchAllSubjects = () => {
    axios
      .get(`${baseAPI}/subject/all`)
      .then((res) => {
        console.log("Subjects", res.data);
        setSubjects(res.data.data);
      })
      .catch((err) => {
        console.log("Error in fetching all subjects", err);
      });
  };
  useEffect(() => {
    fetchAllSubjects();
  }, []);
  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "700" }}>
        Subjects
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "100%",
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
            Edit Subject
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Add New Subject
          </Typography>
        )}

        <TextField
          name="subject_name"
          label="Subject Name"
          value={Formik.values.subject_name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.subject_name && Formik.errors.subject_name && (
          <p style={{ color: "red" }}>{Formik.errors.subject_name}</p>
        )}

        <TextField
          name="subject_codename"
          label="Subject Codename"
          value={Formik.values.subject_codename}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.subject_codename && Formik.errors.subject_codename && (
          <p style={{ color: "red" }}>{Formik.errors.subject_codename}</p>
        )}
        <Button sx={{ width: "120px" }} type="submit" variant="contained">
          Submit
        </Button>

        {edit && (
          <Button
            sx={{ width: "120px" }}
            onClick={() => cancelEdit()}
            type="button"
            variant="outlined"
          >
            Cancel
          </Button>
        )}
      </Box>
      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {subjects &&
          subjects.map((x) => {
            return (
              <Paper key={x._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h4">
                    Subject: {x.subject_name} [{x.subject_codename}]
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(x._id, x.subject_name, x.subject_codename);
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

export default Subject;
