import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedUser = sessionStorage.getItem("auth");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user) => {
    setAuth(user);
    sessionStorage.setItem("auth", JSON.stringify(user));

    if (user.token) {
      sessionStorage.setItem("token", user.token); // Store token separately
    } else {
      console.error("Login response does not include a token.");
    }
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("token"); // Also clear the token from sessionStorage
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("auth");
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
