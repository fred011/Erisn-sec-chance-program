/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, authenticated } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  // If not authenticated, redirect to login
  if (checked && !authenticated) return <Navigate to="/login" />;

  // If user role doesn't match allowed roles, redirect
  if (
    checked &&
    user &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" />;
  }

  // If everything checks out, render the child components
  if (checked) {
    return children;
  }

  return null; // Render nothing until checks are done
}
