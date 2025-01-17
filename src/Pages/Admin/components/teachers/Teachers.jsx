/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, useFormik } from "formik";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";

import {
  teacherEditSchema,
  teacherSchema,
} from "../../../../Components/yupSchema/teacherSchema";
import { useState } from "react";
import { baseAPI } from "../../../../environment";

export default function Teachers() {
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [classes, setClasses] = useState([]);
  // Define initial form field values
  const initialValues = {
    name: "",
    email: "",
    qualification: "",
    age: "",
    gender: "",

    phone_number: "",
    password: "",
    confirm_password: "",
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete teacher?")) {
      console.log("Delete", id);
      axios
        .delete(`${baseAPI}/teacher/delete/${id}`)
        .then((res) => {
          console.log("Teacher delete response", res);

          alert("Teacher deleted successfully");
          fetchTeachers();
        })
        .catch((err) => {
          console.log("Error in deleting teacher", err);

          alert("Failed to delete teacher");
        });
    }
  };
  const cancelEdit = () => {
      setEdit(false);
      setEditId(null);
      Formik.resetForm();
    };

  const handleEdit = (id) => {
    setEdit(true);
    setEditId(id);
    const filteredTeacher = teachers.filter((x) => x._id === id);
    console.log("Filtered Teacher ", filteredTeacher);

    formik.setFieldValue("name", filteredTeacher[0].name);
    formik.setFieldValue("email", filteredTeacher[0].email);
    formik.setFieldValue("qualification", filteredTeacher[0].qualification);
    formik.setFieldValue("age", filteredTeacher[0].age);
    formik.setFieldValue("gender", filteredTeacher[0].gender);
    formik.setFieldValue("guardian", filteredTeacher[0].guardian);
    formik.setFieldValue("phone_number", filteredTeacher[0].phone_number);
  };

  // Formik setup for form state management, validation, and submission
  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: edit ? teacherEditSchema : teacherSchema, // Attach Yup schema for validation
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        const data = {
          name: values.name,
          email: values.email,
          qualification: values.qualification,
          age: values.age,
          gender: values.gender,

          phone_number: values.phone_number,
        };

        if (values.password) {
          const data = { password: values.password };
        }

        axios
          .patch(
            `https://erisn-api.onrender.com/api/teacher/update/${editId}`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("updated Teachers data : ", res.data.data);
            alert(`Teacher updated successfully!`);

            resetForm(); // Clear the form
            fetchTeachers();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error updating Teacher");
          });
      } else {
        // Prepare the data to be sent to the API
        const data = {
          name: values.name,
          email: values.email,
          qualification: values.qualification,
          age: values.age,
          gender: values.gender,

          phone_number: values.phone_number,
          password: values.password,
        };

        // API call to register the user
        axios
          .post(
            `https://erisn-api.onrender.com/api/teacher/register`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("Registered Teachers data : ", res.data.data);
            alert(`Teacher registered successfully!`);

            resetForm();
            fetchTeachers();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error registering Teacher");
          });
      }
    },
  });

  const fetchClasses = () => {
    axios
      .get(`${baseAPI}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching class");
      });
  };

  const [params, setParams] = useState({});
  const handleClass = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      qualification: e.target.value || undefined,
    }));
  };
  const handleSearch = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: e.target.value || undefined,
    }));
  };

  const [teachers, setTeachers] = useState([]);
  const fetchTeachers = () => {
    axios
      .get(`${baseAPI}/teacher/fetch-with-query`, { params })
      .then((res) => {
        setTeachers(res.data.teachers);
        console.log("Response Teachers", res);
      })
      .catch((e) => {
        console.log("Error in fetching class");
      });
  };

  React.useEffect(() => {
    fetchClasses();
  }, []);
  React.useEffect(() => {
    fetchTeachers();
  }, [params]);
  return (
    <>
      <Box
        component={"div"}
        sx={{ height: "100%", paddingTop: "60px", paddingBottom: "60px" }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          Teachers
        </Typography>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 }, // Add margin to child elements
            display: "flex",
            flexDirection: "column",
            width: "60vw",
            minWidth: "230px",
            margin: "auto",
            marginTop: "50px",
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit} // Attach Formik's submit handler
        >
          {edit ? (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "500" }}
            >
              Edit Teacher
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "500" }}
            >
              Add Teacher
            </Typography>
          )}

          {/* Name Input */}
          <TextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p style={{ color: "red" }}>{formik.errors.name}</p> // Show error if name is invalid
          )}

          {/* Email Input */}
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p style={{ color: "red" }}>{formik.errors.email}</p>
          )}
          {/* Teacher qualification Input */}

          <TextField
            name="qualification"
            label="Qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.qualification && formik.errors.qualification && (
            <p style={{ color: "red" }}>{formik.errors.qualification}</p> // Show error if name is invalid
          )}
          {/* Age Input */}
          <TextField
            name="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age && (
            <p style={{ color: "red" }}>{formik.errors.age}</p> // Show error if name is invalid
          )}

          {/* Gender Input */}
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={formik.values.gender}
              label="Gender"
              name="gender"
              onChange={formik.handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.gender && formik.errors.gender && (
            <p style={{ color: "red" }}>{formik.errors.gender}</p> // Show error if name is invalid
          )}

          {/*  phone Input */}
          <TextField
            name="phone_number"
            label="Phone Number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <p style={{ color: "red" }}>{formik.errors.phone_number}</p> // Show error if name is invalid
          )}

          {/* Password Input */}
          <TextField
            type="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          )}

          {/* Confirm Password Input */}
          <TextField
            type="password"
            name="confirm_password"
            label="Confirm Password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <p style={{ color: "red" }}>{formik.errors.confirm_password}</p>
            )}

          {/* Submit Button */}
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
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <TextField
            label="search"
            value={params.search ? params.search : ""}
            onChange={(e) => {
              handleSearch(e);
            }}
            // onBlur={formik.handleBlur}
          />

          {/* <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
            <InputLabel id="qualification">Teacher Class</InputLabel>
            <Select
              // value={formik.values.qualification}
              label="Teacher Class"
              value={params.qualification ? params.qualification : ""}
              // name="qualification"
              onChange={(e) => {
                handleClass(e);
              }}
            >
              <MenuItem value="">Select Class</MenuItem>
              {classes &&
                classes.map((x) => {
                  return (
                    <MenuItem key={x._id} value={x._id}>
                      {x.class_text} ({x.class_num})
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl> */}
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {teachers &&
            teachers.map((teacher) => {
              return (
                <Card key={teacher._id} sx={{ maxWidth: 345, margin: "10px" }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "700" }}
                      >
                        Teacher Details
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Name : </span>
                        {teacher.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Email : </span>
                        {teacher.email}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>
                          Qualification :{" "}
                        </span>
                        {teacher.qualification}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Age : </span>
                        {teacher.age}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Gender : </span>
                        {teacher.gender}
                      </Typography>

                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Phone Number : </span>
                        {teacher.phone_number}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <Button
                          onClick={() => {
                            handleEdit(teacher._id);
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          sx={{ marginLeft: "10px" }}
                          onClick={() => {
                            handleDelete(teacher._id);
                          }}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </Button>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
        </Box>
      </Box>
    </>
  );
}
