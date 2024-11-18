import React from "react";
import "./SignInAsAdmin.css";
import logo from "../../../Images/ERISN LOGO.png";

const SignInAsAdmin = () => {
  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="title">Admin</div>
      <form action="" className="login-form">
        <div className="input-box">
          <label htmlFor="">Access Key:</label>
          <input type="password" className="field" name="" id="" required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignInAsAdmin;
