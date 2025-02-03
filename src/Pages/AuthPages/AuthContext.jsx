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
    navigate("/login", { replace: true }); // Redirect to login
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
