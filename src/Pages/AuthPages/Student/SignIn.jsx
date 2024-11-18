import React from "react";
import logo from "../../../Images/ERISN LOGO.png";

const SignIn = () => {
  return (
    <div>
      <div className="container">
        <img src={logo} alt="" />
        <div className="title">Student</div>
        <form action="" className="login-form">
          <div className="input-box">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="field"
              name=""
              id=""
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
