/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, authenticated } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setChecked(true);
    } else {
      setChecked(true);
    }
  }, []);

  if (checked && !authenticated) {
    return <Navigate to="/login" />;
  }

  if (
    checked &&
    allowedRoles &&
    !allowedRoles.includes(user?.role?.toUpperCase())
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}
