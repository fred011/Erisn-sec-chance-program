/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Header from "../../Components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar, Pie } from "react-chartjs-2";
import "./style.css";
import dashboardConfig from "./dashboardConfig.json";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Import the FontAwesome icons
import {
  faUser,
  faUsers,
  faClipboardList,
  faFileAlt,
  faUserGraduate,
  faClipboardCheck,
  faCreditCard,
  faArrowRight,
  faCalendar,
  faCheckCircle,
  faChalkboard,
  faBell,
  faBook,
  faCoins,
  faPlaneDeparture,
  faTimesCircle,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mapping of icon string names to actual FontAwesome icons
const iconMapping = {
  faUser: faUser,
  faUsers: faUsers,
  faClipboardList: faClipboardList,
  faFileAlt: faFileAlt,
  faUserGraduate: faUserGraduate,
  faClipboardCheck: faClipboardCheck,
  faCreditCard: faCreditCard,
  faArrowRight: faArrowRight,
  faCalendar: faCalendar,
  faCheckCircle: faCheckCircle,
  faChalkboard: faChalkboard,
  faBell: faBell,
  faBook: faBook,
  fees: faCoins,
  "credit-card": faCreditCard,
  faPlaneDeparture: faPlaneDeparture,
  faTimesCircle: faTimesCircle,
  faCalendarCheck: faCalendarCheck,
};

const Widget = ({ title, value, icon, color }) => {
  // Use the icon mapping to get the correct FontAwesome icon
  const iconComponent = iconMapping[icon];
  if (!iconComponent) {
    console.error(`Icon ${icon} not found`);
    return null;
  }

  return (
    <div className={`widget ${color}`}>
      <FontAwesomeIcon icon={iconComponent} className="icon" />
      <p>{value}</p>
      <h3>{title}</h3>
    </div>
  );
};

const Dashboard = ({ role }) => {
  const [dashboardConfigr, setDashboardConfig] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    setDashboardConfig(dashboardConfig[role]);
  }, [role]);

  if (!dashboardConfigr) return <div>Loading...</div>;

  if (!dashboardConfigr.forms || !dashboardConfigr.links)
    return <div>Error loading dashboard data.</div>;

  const { forms, links, widgets, charts } = dashboardConfigr;

  const toggleForm = (form) => {
    setActiveForm(activeForm === form ? null : form);
  };

  const renderForm = (form) => {
    const formConfig = forms.find((f) => f.action === form);

    if (!formConfig) return null;

    return (
      <div className="form-container">
        <button className="close-btn" onClick={() => toggleForm(form)}>
          X
        </button>

        <h3>{formConfig.title}</h3>
        <div>
          {formConfig.fields.map((field, index) => {
            switch (field.type) {
              case "text":
              case "number":
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <input type={field.type} placeholder={field.placeholder} />
                  </div>
                );
              case "textarea":
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <textarea placeholder={field.placeholder}></textarea>
                  </div>
                );
              case "select":
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <select>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              default:
                return null;
            }
          })}
          <button type="submit" className="form-button">
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Header />
      <Sidebar role={role} />
      <div className="main-content admin-dashboard">
        {/* Render Widgets */}
        <div className="widgets">
          {widgets && widgets.length > 0 ? (
            widgets.map((widget, index) => (
              <Widget
                key={index}
                title={widget.title}
                value={widget.value}
                icon={widget.icon}
                color={widget.color}
              />
            ))
          ) : (
            <div>No widgets available for this role</div>
          )}
        </div>
        <br />
        {/* Render Dashboard Links dynamically */}
        <div className="dashboard-links">
          {links.map((link, index) => (
            <div
              className="card"
              key={index}
              onClick={() => toggleForm(link.action)}
            >
              <FontAwesomeIcon icon={iconMapping[link.icon]} size="2x" />
              <p>{link.title}</p>
            </div>
          ))}
        </div>
        {activeForm && renderForm(activeForm)}
        <br />
        {/* Render Charts */}
        <div className="charts-container">
          <div className="chart-column">
            <h3>{charts.heading} Bar Chart</h3>
            <Bar data={charts.bar} />
          </div>
          <div className="chart-column" style={{ height: "300px" }}>
            <h3>{charts.heading} Pie Chart</h3>
            <Pie data={charts.pie} options={pieChartOptions} />
          </div>
        </div>
        <br /> <br />
      </div>
    </div>
  );
};

export default Dashboard;
