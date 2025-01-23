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
  const [filterAudience, setFilterAudience] = useState("all");

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
                "Content-Type": "application/json",
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

  // Filter notices based on audience
  const filteredNotices = notices.filter(
    (notice) => filterAudience === "all" || notice.audience === filterAudience
  );

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
            value={formik.values.audience}
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          backgroundColor: "grey.100",
          borderRadius: 2,
          boxShadow: 1,
          my: 2,
        }}
      >
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Notice For{" "}
            <Box
              component="span"
              sx={{
                ml: 1,
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              {filterAudience}
            </Box>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant={filterAudience === "student" ? "contained" : "outlined"}
            onClick={() => setFilterAudience("student")}
            sx={{
              minWidth: 150,
              textTransform: "uppercase",
            }}
          >
            Student Notices
          </Button>
          <Button
            variant={filterAudience === "teacher" ? "contained" : "outlined"}
            onClick={() => setFilterAudience("teacher")}
            sx={{
              minWidth: 150,
              textTransform: "uppercase",
            }}
          >
            Teacher Notices
          </Button>
          <Button
            variant={filterAudience === "all" ? "contained" : "outlined"}
            onClick={() => setFilterAudience("all")}
            sx={{
              minWidth: 150,
              textTransform: "uppercase",
            }}
          >
            All Notices
          </Button>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {filteredNotices?.map((notice) => (
          <Paper
            key={notice._id}
            sx={{
              width: 300,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 3,
              },
            }}
            elevation={2}
          >
            <Box>
              <Typography variant="h5" color="primary" gutterBottom>
                {notice.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {notice.message}
              </Typography>
              <Typography variant="subtitle2" color="text.disabled">
                Audience: {notice.audience.toUpperCase()}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mr: 1 }}
                onClick={() =>
                  handleEdit(
                    notice._id,
                    notice.title,
                    notice.message,
                    notice.audience
                  )
                }
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(notice._id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default Notice;
