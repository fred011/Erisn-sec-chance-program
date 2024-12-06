import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import Attendance from "./Pages/Admin/components/attendence/Attendance.jsx";
import Class from "./Pages/Admin/components/class/Class.jsx";
import Dashboard from "./Pages/Admin/components/dashboard/Dashboard.jsx";
import Examinations from "./Pages/Admin/components/examinations/Examinations.jsx";
import Notice from "./Pages/Admin/components/notice/Notice.jsx";
import Schedule from "./Pages/Admin/components/schedule/Schedule.jsx";
import Subjects from "./Pages/Admin/components/subjects/Subjects.jsx";
import Students from "./Pages/Admin/components/students/Students.jsx";
import Teachers from "./Pages/Admin/components/teachers/Teachers.jsx";
import Fees from "./Pages/Admin/components/fees/Fees.jsx";
// import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/admin" element={<Dashboard role="admin" />} />
        <Route path="/teacher" element={<Dashboard role="teacher" />} />
        <Route path="/student" element={<Dashboard role="student" />} /> */}

        {/*Admin Route */}
        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="class" element={<Class />} />
          <Route path="fees" element={<Fees />} />
          <Route path="examinations" element={<Examinations />} />
          <Route path="notice" element={<Notice />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>
        {/*Teacher Route */}
        <Route></Route>
        {/*Student Route */}
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
