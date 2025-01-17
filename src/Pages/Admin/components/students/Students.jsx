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
  studentEditSchema,
  studentSchema,
} from "../../../../Components/yupSchema/studentSchema";
import { useState } from "react";
import { baseAPI } from "../../../../environment";

export default function Students() {
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [classes, setClasses] = useState([]);
  // Define initial form field values
  const initialValues = {
    name: "",
    email: "",
    student_class: "",
    age: "",
    gender: "",
    guardian: "",
    guardian_phone: "",
    password: "",
    confirm_password: "",
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete student?")) {
      console.log("Delete", id);
      axios
        .delete(`${baseAPI}/student/delete/${id}`)
        .then((res) => {
          console.log("Student delete response", res);

          alert("Student deleted successfully");
          fetchStudents();
        })
        .catch((err) => {
          console.log("Error in deleting student", err);

          alert("Failed to delete student");
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
    const filteredStudent = students.filter((x) => x._id === id);
    console.log("Filtered Student ", filteredStudent);

    formik.setFieldValue("name", filteredStudent[0].name);
    formik.setFieldValue("email", filteredStudent[0].email);
    formik.setFieldValue("student_class", filteredStudent[0].student_class._id);
    formik.setFieldValue("age", filteredStudent[0].age);
    formik.setFieldValue("gender", filteredStudent[0].gender);
    formik.setFieldValue("guardian", filteredStudent[0].guardian);
    formik.setFieldValue("guardian_phone", filteredStudent[0].guardian_phone);
  };

  // Formik setup for form state management, validation, and submission
  const formik = useFormik({
    initialValues, // Set initial values
    validationSchema: edit ? studentEditSchema : studentSchema, // Attach Yup schema for validation
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        const data = {
          name: values.name,
          email: values.email,
          student_class: values.student_class,
          age: values.age,
          gender: values.gender,
          guardian: values.guardian,
          guardian_phone: values.guardian_phone,
        };

        if (values.password) {
          const data = { password: values.password };
        }

        axios
          .patch(
            `https://erisn-api.onrender.com/api/student/update/${editId}`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("updated Students data : ", res.data.data);
            alert(`Student updated successfully!`);

            resetForm(); // Clear the form
            fetchStudents();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error updating Student");
          });
      } else {
        // Prepare the data to be sent to the API
        const data = {
          name: values.name,
          email: values.email,
          student_class: values.student_class,
          age: values.age,
          gender: values.gender,
          guardian: values.guardian,
          guardian_phone: values.guardian_phone,
          password: values.password,
        };

        // API call to register the user
        axios
          .post(
            `https://erisn-api.onrender.com/api/student/register`, // API endpoint depends on the selected role
            data,
            { withCredentials: true } // Include credentials like cookies
          )
          .then((res) => {
            // On successful registration
            console.log("Registered Students data : ", res.data.data);
            alert(`Student registered successfully!`);

            resetForm();
            fetchStudents();
          })
          .catch((err) => {
            // Handle errors
            alert(err.response?.data?.error || "Error registering Student");
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
      student_class: e.target.value || undefined,
    }));
  };
  const handleSearch = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: e.target.value || undefined,
    }));
  };

  const [students, setStudents] = useState([]);
  const fetchStudents = () => {
    axios
      .get(`${baseAPI}/student/fetch-with-query`, { params })
      .then((res) => {
        setStudents(res.data.students);
        console.log("Response Students", res);
      })
      .catch((e) => {
        console.log("Error in fetching class");
      });
  };

  React.useEffect(() => {
    fetchClasses();
  }, []);
  React.useEffect(() => {
    fetchStudents();
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
          Students
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
              Edit Student
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "500" }}
            >
              Add Student
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
          {/* Student class Input */}

          <FormControl fullWidth>
            <InputLabel id="student_class">Student Class</InputLabel>
            <Select
              labelId="student_class"
              id="student_class"
              value={formik.values.student_class}
              label="Student Class"
              name="student_class"
              onChange={formik.handleChange}
            >
              {/* <MenuItem value={""}>Select Class</MenuItem> */}
              {classes &&
                classes.map((x) => {
                  return (
                    <MenuItem key={x._id} value={x._id}>
                      {x.class_text} ({x.class_num})
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          {formik.touched.student_class && formik.errors.student_class && (
            <p style={{ color: "red" }}>{formik.errors.student_class}</p> // Show error if name is invalid
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
          {/* Guardian Input */}
          <TextField
            name="guardian"
            label="Guardian"
            value={formik.values.guardian}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.guardian && formik.errors.guardian && (
            <p style={{ color: "red" }}>{formik.errors.guardian}</p> // Show error if name is invalid
          )}
          {/* Guardian phone Input */}
          <TextField
            name="guardian_phone"
            label="Guardian Phone Number"
            value={formik.values.guardian_phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.guardian_phone && formik.errors.guardian_phone && (
            <p style={{ color: "red" }}>{formik.errors.guardian_phone}</p> // Show error if name is invalid
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

          <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
            <InputLabel id="student_class">Student Class</InputLabel>
            <Select
              // value={formik.values.student_class}
              label="Student Class"
              value={params.student_class ? params.student_class : ""}
              // name="student_class"
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
          </FormControl>
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
          {students &&
            students.map((student) => {
              return (
                <Card key={student._id} sx={{ maxWidth: 345, margin: "10px" }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "700" }}
                      >
                        Student Details
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Name : </span>
                        {student.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Email : </span>
                        {student.email}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Class : </span>
                        {student.student_class
                          ? student.student_class.class_text
                          : "Not Assigned"}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Age : </span>
                        {student.age}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Gender : </span>
                        {student.gender}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>Guardian : </span>
                        {student.guardian}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span style={{ fontWeight: 700 }}>
                          Guardian Phone :{" "}
                        </span>
                        {student.guardian_phone}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <Button
                          onClick={() => {
                            handleEdit(student._id);
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          sx={{ marginLeft: "10px" }}
                          onClick={() => {
                            handleDelete(student._id);
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
