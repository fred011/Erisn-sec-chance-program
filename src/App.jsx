import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignInAsPage from "./Pages/AuthPages/SignInAsPage";
import SignInAsAdmin from "./Pages/AuthPages/Admin/SignInAsAdmin";
import SignIn from "./Pages/AuthPages/Student/SignIn";
import TeacherSignIn from "./Pages/AuthPages/Teacher/TeacherSignIn";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard";
import StudentDashboard from "./Pages/Student/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signInAsPage" element={<SignInAsPage />} />
        <Route path="/signInAsAdmin" element={<SignInAsAdmin />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/teacherSignIn" element={<TeacherSignIn />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
