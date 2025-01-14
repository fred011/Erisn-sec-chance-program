/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedUser = localStorage.getItem("auth");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user) => {
    setAuth(user);
    localStorage.setItem("auth", JSON.stringify(user));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("auth");
    if (savedUser) {
      setAuth(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
