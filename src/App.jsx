import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignInAsPage from "./Pages/AuthPages/SignInAsPage";
import SignInAsAdmin from "./Pages/AuthPages/Admin/SignInAsAdmin";
import SignIn from "./Pages/AuthPages/Student/SignIn";
import TeacherSignIn from "./Pages/AuthPages/Teacher/TeacherSignIn";
// import Admin from "./Pages/Admin/Admin";
// import Teacher from "./Pages/Teacher/Teacher";
// import Student from "./Pages/Student/Student";
import Dashboard from "./Pages/Dashboard/Dashboard";
<<<<<<< HEAD
import Register from "./Pages/AuthPages/Register";
=======
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signInAsPage" element={<SignInAsPage />} />
        <Route path="/signInAsAdmin" element={<SignInAsAdmin />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/teacherSignIn" element={<TeacherSignIn />} />
        {/* <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} /> */}
        <Route path="/admin" element={<Dashboard role="admin" />} />
        <Route path="/teacher" element={<Dashboard role="teacher" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Dashboard role="student" />} />

        <Route path="/student" element={<Dashboard role="student" />} />
        
        
        
>>>>>>> 8a74c9694c4a3d412cc8120ba17c6d6e6c526627
      </Routes>
    </Router>
  );
}

export default App;
