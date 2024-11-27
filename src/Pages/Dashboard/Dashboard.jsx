import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Header from "../../Components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar, Pie } from "react-chartjs-2";
import "./style.css";
import dashboardConfig from "./dashboardConfig.json";
<<<<<<< HEAD
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
  user: faUser,
  users: faUsers,
  "clipboard-list": faClipboardList,
  "clipboard-check": faClipboardCheck,
  "file-alt": faFileAlt,
  calendar: faCalendar,
  "check-circle": faCheckCircle,
  chalkboard: faChalkboard,
  book: faBook,
  bell: faBell,
  "user-graduate": faUserGraduate,
  fees: faCoins,
  "credit-card": faCreditCard,
  faPlaneDeparture: faPlaneDeparture,
  faTimesCircle: faTimesCircle,
  faCalendarCheck: faCalendarCheck,
};

=======
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Import the FontAwesome icons
import { faUser, faUsers, faClipboardList, faFileAlt, faUserGraduate, 
         faClipboardCheck, faCreditCard, faArrowRight, faCalendar,faCheckCircle,
         faChalkboard, faBell, faBook, faCoins, faPlaneDeparture, faTimesCircle,
         faCalendarCheck} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Mapping of icon string names to actual FontAwesome icons
const iconMapping = {
  "faUser": faUser,
  "faUsers": faUsers,
  "faClipboardList": faClipboardList,
  "faFileAlt": faFileAlt,
  "faUserGraduate": faUserGraduate,
  "faClipboardCheck": faClipboardCheck,
  "faCreditCard": faCreditCard,
  "faArrowRight": faArrowRight,
  "faCalendar": faCalendar,
  "faCheckCircle": faCheckCircle,
  "faChalkboard": faChalkboard,
  "faBell": faBell,
  "faBook": faBook,
  "user": faUser,
  "users": faUsers,
  "clipboard-list": faClipboardList,
  "clipboard-check": faClipboardCheck,
  "file-alt": faFileAlt,
  "calendar": faCalendar,
  "check-circle": faCheckCircle,
  "chalkboard": faChalkboard,
  "book": faBook,
  "bell": faBell,
  "user-graduate": faUserGraduate,
  "fees": faCoins,
  "credit-card": faCreditCard,
  "faPlaneDeparture": faPlaneDeparture,
  "faTimesCircle": faTimesCircle,
  "faCalendarCheck": faCalendarCheck
};


>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
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
<<<<<<< HEAD
        position: "top",
=======
        position: 'top',
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
      },
    },
  };

  useEffect(() => {
    setDashboardConfig(dashboardConfig[role]);
  }, [role]);

  if (!dashboardConfigr) return <div>Loading...</div>;
<<<<<<< HEAD
  if (!dashboardConfigr.forms || !dashboardConfigr.links)
    return <div>Error loading dashboard data.</div>;
=======
  if (!dashboardConfigr.forms || !dashboardConfigr.links) return <div>Error loading dashboard data.</div>;
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627

  const { forms, links, widgets, charts } = dashboardConfigr;

  console.log(dashboardConfigr);

  const toggleForm = (form) => {
    setActiveForm(activeForm === form ? null : form);
  };

  const renderForm = (form) => {
<<<<<<< HEAD
    const formConfig = forms.find((f) => f.action === form);
=======
    const formConfig = forms.find(f => f.action === form);
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
    if (!formConfig) return null;

    return (
      <div className="form-container">
<<<<<<< HEAD
        <button className="close-btn" onClick={() => toggleForm(form)}>
          X
        </button>
=======
        <button className="close-btn" onClick={() => toggleForm(form)}>X</button>
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
        <h3>{formConfig.title}</h3>
        <div>
          {formConfig.fields.map((field, index) => {
            switch (field.type) {
<<<<<<< HEAD
              case "text":
=======
              case 'text':
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <input type={field.type} placeholder={field.placeholder} />
                  </div>
                );
<<<<<<< HEAD
              case "number":
=======
              case 'number':
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <input type={field.type} placeholder={field.placeholder} />
                  </div>
                );
<<<<<<< HEAD
              case "textarea":
=======
              case 'textarea':
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <textarea placeholder={field.placeholder}></textarea>
                  </div>
                );
<<<<<<< HEAD
              case "select":
=======
              case 'select':
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
                return (
                  <div key={index}>
                    <label>{field.label}:</label>
                    <select>
                      {field.options.map((option, idx) => (
<<<<<<< HEAD
                        <option key={idx} value={option.toLowerCase()}>
                          {option}
                        </option>
=======
                        <option key={idx} value={option.toLowerCase()}>{option}</option>
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
                      ))}
                    </select>
                  </div>
                );
              default:
                return null;
            }
          })}
<<<<<<< HEAD
          <button type="submit" className="form-button">
            Submit
          </button>
=======
          <button type="submit" className="form-button">Submit</button>
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
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
<<<<<<< HEAD
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
=======
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
            <div className="card" key={index} onClick={() => toggleForm(link.action)}>
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
              <FontAwesomeIcon icon={iconMapping[link.icon]} size="2x" />
              <p>{link.title}</p>
            </div>
          ))}
        </div>
<<<<<<< HEAD
        {activeForm && renderForm(activeForm)}
        <br />
=======

        {activeForm && renderForm(activeForm)}

        <br />

>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
        {/* Render Charts */}
        <div className="charts-container">
          <div className="chart-column">
            <h3>{charts.heading} Bar Chart</h3>
            <Bar data={charts.bar} />
          </div>
<<<<<<< HEAD
          <div className="chart-column" style={{ height: "300px" }}>
=======
          <div className="chart-column" style={{ height: '300px' }}>
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
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
