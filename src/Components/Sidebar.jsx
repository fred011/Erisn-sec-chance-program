import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaMoneyBill,
  FaBell,
  FaHandshake,
  FaArchive,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: <FaHome /> },
      { name: "Teachers", path: "/admin/teachers", icon: <FaUser /> },
      { name: "Students", path: "/admin/students", icon: <FaUser /> },
      { name: "Admissions", path: "/admin/admissions", icon: <FaArchive /> },
      { name: "Fees", path: "/admin/fees", icon: <FaMoneyBill /> },
      { name: "Behavior Tracking", path: "/admin/behavior", icon: <FaBell /> },
      { name: "Library", path: "/admin/library", icon: <FaBook /> },
      {
        name: "Sponsorship",
        path: "/admin/sponsorship",
        icon: <FaHandshake />,
      },
      { name: "Alumni", path: "/admin/alumni", icon: <FaUser /> },
    ],
    teacher: [
      { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
      { name: "Students", path: "/teacher/students", icon: <FaUser /> },
      {
        name: "Behavior Tracking",
        path: "/teacher/behavior",
        icon: <FaBell />,
      },
      { name: "Library", path: "/teacher/library", icon: <FaBook /> },
    ],
    student: [
      { name: "Dashboard", path: "/student", icon: <FaHome /> },
      { name: "Schedule", path: "/student/schedule", icon: <FaBook /> },
      { name: "Fees", path: "/student/fees", icon: <FaMoneyBill /> },
      { name: "Library", path: "/student/library", icon: <FaBook /> },
    ],
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? "➤" : "◀"}
      </button>
      <h2 className="sidebar-title">
        {isCollapsed
          ? "Menu"
          : `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`}
      </h2> */}
      <ul className="sidebar-links">
        {links[role].map((link, index) => (
          <li key={index}>
            <Link to={link.path} data-tooltip={link.name}>
              {link.icon}
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  role: PropTypes.oneOf(["admin", "teacher", "student"]),
};

export default Sidebar;
