/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      setAuthenticated(true);
      setRole(storedRole.replace(/"/g, "")); // Remove quotes from the stored role
    }

    setChecked(true);
  }, []);

  if (checked && !authenticated) {
    return <Navigate to="/login" />;
  }

  if (checked && allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}
