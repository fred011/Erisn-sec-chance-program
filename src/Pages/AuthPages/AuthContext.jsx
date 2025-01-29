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

    if (user.token) {
      localStorage.setItem("token", user.token); // Store token separately
    } else {
      console.error("Login response does not include a token.");
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token"); // Also clear the token from localStorage
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
