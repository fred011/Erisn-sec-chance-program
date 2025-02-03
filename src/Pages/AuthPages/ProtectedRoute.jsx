import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Wait for auth check to complete

  // If not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but role doesn't match the required role, redirect to a forbidden page or another route
  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated and has the correct role, render children
  return children;
};

export default ProtectedRoute;
