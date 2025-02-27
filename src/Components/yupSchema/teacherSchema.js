/* eslint-disable no-control-regex */
import * as Yup from "yup";
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const teacherSchema = Yup.object({
  name: Yup.string()
    .min(3, "Teacher name must contain 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),

  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  qualification: Yup.string().required("Qualification is required"),

  phone_number: Yup.string()
    .min(10, "Must contain 10 characters")
    .max(10, "Cannot extend 10 characters")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
export const teacherEditSchema = Yup.object({
  name: Yup.string()
    .min(3, "Teacher name must contain 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),

  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  qualification: Yup.string().required("Qualification is required"),
  phone_number: Yup.string()
    .min(10, "Must contain 10 characters")
    .max(10, "Cannot extend 10 characters")
    .required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),

  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
