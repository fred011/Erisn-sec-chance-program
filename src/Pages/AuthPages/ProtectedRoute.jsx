import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Wait for auth check to complete

  return auth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
