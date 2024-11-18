// src/components/Header.js
import React from "react";

function Header({ title }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <div className="profile">
        <span>Welcome, User</span>
        <button>Log Out</button>
      </div>
    </div>
  );
}

export default Header;
