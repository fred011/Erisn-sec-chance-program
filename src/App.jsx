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

/////////
import Teacher from "./Pages/Teacher/Teacher.jsx";
import TeacherDetails from "./Pages/Teacher/components/teacher details/TeacherDetails.jsx";
import ScheduleTeacher from "./Pages/Teacher/components/schedule/ScheduleTeacher.jsx";
import AttendanceTeacher from "./Pages/Teacher/components/attendance/AttendanceTeacher.jsx";
import ExaminationsTeacher from "./Pages/Teacher/components/examinations/ExaminationsTeacher.jsx";
import NoticeTeacher from "./Pages/Teacher/components/notice/NoticeTeacher.jsx";
import Student from "./Pages/Student/Student.jsx";
import StudentDetails from "./Pages/Student/components/student details/StudentDetails.jsx";
import ScheduleStudent from "./Pages/Student/components/schedule/ScheduleStudent.jsx";
import AttendanceStudent from "./Pages/Student/components/attendance/AttendanceStudent.jsx";
import ExaminationsStudent from "./Pages/Student/components/examinations/ExaminationsStudent.jsx";
import NoticeStudent from "./Pages/Student/components/notice/NoticeStudent.jsx";
// import ProtectedRoute from "./guard/ProtectedRoute.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
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
          <Route path="teacher" element={<Teacher />}>
            <Route index element={<TeacherDetails />} />
            <Route path="schedule" element={<ScheduleTeacher />} />
            <Route path="attendance" element={<AttendanceTeacher />} />
            <Route path="examinations" element={<ExaminationsTeacher />} />
            <Route path="notice" element={<NoticeTeacher />} />
          </Route>
          {/*Student Route */}
          <Route path="student" element={<Student />}>
            <Route index element={<StudentDetails />} />
            <Route path="schedule" element={<ScheduleStudent />} />
            <Route path="attendance" element={<AttendanceStudent />} />
            <Route path="examinations" element={<ExaminationsStudent />} />
            <Route path="notice" element={<NoticeStudent />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
