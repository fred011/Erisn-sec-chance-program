import React from "react";
import logo from "../../../Images/ERISN LOGO.png";

const TeacherSignIn = () => {
  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="title">Teacher</div>
      <form action="" className="login-form">
        <div className="input-box">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="field"
            name=""
            placeholder="Enter your email"
            id=""
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="field"
            name=""
            id=""
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default TeacherSignIn;
