import React, { createContext, useState, useEffect } from "react";
import { baseAPI } from "../../environment";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);

        // Verify if token is still valid (Backend should provide a /verify-token endpoint)
        fetch(`${baseAPI}/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.valid) {
              setAuth(parsedUser); // Token is valid, keep user logged in
            } else {
              logout(); // Token is invalid, log user out
            }
          })
          .catch(() => logout()); // Handle errors by logging out
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = (user) => {
    if (user.token) {
      localStorage.setItem("auth", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      setAuth(user);
    } else {
      console.error("Login response does not include a token.");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
