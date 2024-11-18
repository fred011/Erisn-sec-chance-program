import React from "react";
import "./SignInAsPage.css";
import admin from "../../Images/admin.jpg";
import teacher from "../../Images/teacher.jpg";
import student from "../../Images/student.jpg";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/ERISN LOGO.png";

const SignInAsPage = () => {
  const navigate = useNavigate();

  const adminLogin = () => {
    navigate("/signInAsAdmin");
  };
  const studentLogin = () => {
    navigate("/signIn");
  };
  const teacherLogin = () => {
    navigate("/teacherSignIn");
  };
  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="title">Sign In </div>
      <div className="sub-title">As</div>
      <div className="cards">
        <div className="card">
          <div className="card-title">Admin</div>
          <img src={admin} alt="" />
          <button onClick={adminLogin}>SignIn</button>
        </div>
        <div className="card">
          <div className="card-title">Teacher</div>
          <img src={teacher} alt="" />
          <button onClick={teacherLogin}>SignIn</button>
        </div>
        <div className="card">
          <div className="card-title">Student</div>
          <img src={student} alt="" />
          <button onClick={studentLogin}>SignIn</button>
        </div>
      </div>
    </div>
  );
};

export default SignInAsPage;
