/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user?.role?.toUpperCase())) {
    return <Navigate to="/login" />;
  }

  return children;
}
