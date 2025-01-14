import * as Yup from "yup";

export const studentSchema = Yup.object({
  name: Yup.string()
    .min(3, "Student name must contain 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  student_class: Yup.string().required("Student class is required"),
  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  guardian: Yup.string()
    .min(3, "Guardian name must  contain 3 characters")
    .required("Guardian name is required"),
  guardian_phone: Yup.string()
    .min(10, "Must contain 10 characters")
    .max(10, "Cannot extend 10 characters")
    .required("Guardian name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
