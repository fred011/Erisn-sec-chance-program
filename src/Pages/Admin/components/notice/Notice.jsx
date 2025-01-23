/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

import React, { useEffect, useState } from "react";
import { noticeSchema } from "../../../../Components/yupSchema/noticeSchema";
import axios from "axios";
import { baseAPI } from "../../../../environment";

//Icons

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Notice = () => {
  const [editId, setEditId] = useState(null);
  const [notices, setNotices] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleEdit = (id, title, message, audience) => {
    console.log("Edit", id);
    setEdit(true);
    setEditId(id);
    formik.setFieldValue("title", title);
    formik.setFieldValue("message", message);
    formik.setFieldValue("audience", audience);
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete notice?")) {
      console.log("Delete", id);
      axios
        .delete(`${baseAPI}/notice/delete/${id}`)
        .then((res) => {
          console.log("Notice delete response", res);

          alert("Notice deleted successfully, reload the page to see changes");
          fetchAllNotices();
        })
        .catch((err) => {
          console.log("Error in deleting notice", err);

          alert("Failed to delete notice");
        });
    }
  };
  const cancelEdit = () => {
    setEdit(false);
    setEditId(null);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: { title: "", message: "", audience: "" },
    validationSchema: noticeSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (edit) {
        axios
          .patch(
            `${baseAPI}/notice/update/${editId}`,
            { ...values },
            {
              headers: {
                "Content-Type": "application/json", // Ensure the correct header is sent
              },
            }
          )
          .then((res) => {
            console.log("Notice update response", res);
            alert("Notice updated successfully");

            cancelEdit();
            fetchAllNotices();
          })
          .catch((err) => {
            console.log(
              "Error in updating notice",
              err.response ? err.response.data : err.message
            );
            alert("Failed to update notice");
          });
      } else {
        axios
          .post(`${baseAPI}/notice/create`, { ...values })
          .then((res) => {
            console.log("Notice add response", res);
            alert("Notice added successfully");
            resetForm();
            fetchAllNotices();
          })
          .catch((err) => {
            console.log(
              "Error in adding notice",
              err.response ? err.response.data : err.message
            );
            alert("Failed to add notice");
          });

        resetForm();
      }
    },
  });

  const fetchAllNotices = () => {
    axios
      .get(`${baseAPI}/notice/all`)
      .then((res) => {
        console.log("Notices", res.data);
        setNotices(res.data.data);
      })
      .catch((err) => {
        console.log("Error in fetching all notices", err);
      });
  };
  useEffect(() => {
    fetchAllNotices();
  }, []);
  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "700" }}>
        Notices
      </Typography>
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
        onSubmit={formik.handleSubmit}
      >
        {edit ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Edit Notice
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Add New Notice
          </Typography>
        )}

        <TextField
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <p style={{ color: "red" }}>{formik.errors.title}</p>
        )}

        <TextField
          multiline
          rows={5}
          name="message"
          label="Message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.message && formik.errors.message && (
          <p style={{ color: "red" }}>{formik.errors.message}</p>
        )}

        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel>Audience</InputLabel>
          <Select
            value={formik.values.subject}
            name="audience"
            label="Audience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          >
            <MenuItem value={""}>Select Audience</MenuItem>
            <MenuItem value={"teacher"}>Teacher</MenuItem>
            <MenuItem value={"student"}>Student</MenuItem>
          </Select>
          {formik.touched.audience && formik.errors.audience && (
            <Typography color="error">{formik.errors.audience}</Typography>
          )}
        </FormControl>

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
        {notices &&
          notices.map((x) => {
            return (
              <Paper key={x._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h4" sx={{ fontWeight: "500" }}>
                    <b>Title:</b> {x.title}
                  </Typography>{" "}
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    Message:
                  </Typography>
                  <Typography variant="h6">{x.message}</Typography>
                  <Typography variant="h6">Audience: {x.audience}</Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(x._id, x.title, x.message);
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

export default Notice;
