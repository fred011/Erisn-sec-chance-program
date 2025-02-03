import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Pages/AuthPages/AuthContext";

const API = axios.create({
  baseURL: "https://erisn-api.onrender.coms", // Replace with actual API URL
});

// Add an interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.message === "Invalid token.") {
      const { logout } = useContext(AuthContext);
      logout(); // Automatically logout on invalid token
    }
    return Promise.reject(error);
  }
);

export default API;
