/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setAuthenticated(true);
    }
    if (storedRole) {
      setRole(storedRole.replace(/"/g, "")); // Remove quotes from the stored role
    }
  }, []);

  const login = (role) => {
    setAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    setAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
