/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const savedUser = localStorage.getItem("auth");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user) => {
    setAuth(user);
    localStorage.setItem("auth", JSON.stringify(user));
    localStorage.setItem("token", user.token || "");
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/login", { replace: true }); // Redirect to login page
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        logout(); // Log out if no token
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
