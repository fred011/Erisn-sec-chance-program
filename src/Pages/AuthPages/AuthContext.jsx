import React, { createContext, useState, useEffect } from "react";
import { baseAPI } from "../../environment";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to verify token
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${baseAPI}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success && data.valid) {
        setAuth(data.user); // Restore user info from token
        localStorage.setItem("auth", JSON.stringify(data.user)); // Store user info in localStorage
      } else {
        logout(); // If token is invalid, force logout
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("auth");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      verifyToken(token);
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  const login = (user) => {
    setAuth(user);
    localStorage.setItem("auth", JSON.stringify(user));
    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
